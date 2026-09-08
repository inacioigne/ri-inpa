#!/bin/bash

# ==========================================================
# Monitoramento de recursos do servidor - DSpace
# ==========================================================

INTERVALO=10
LOG_DIR="/var/log/dspace-monitor"
LOG_FILE="$LOG_DIR/recursos.csv"

# Containers do DSpace
CONTAINERS=("ui" "api" "dspacedb" "dspacesolr")

# Criar diretório
mkdir -p "$LOG_DIR"

# Cabeçalho CSV
if [ ! -f "$LOG_FILE" ]; then
    echo "timestamp,cpu_servidor,mem_servidor,load1,load5,load15,swap_used,ui_cpu,ui_mem,api_cpu,api_mem,db_cpu,db_mem,solr_cpu,solr_mem" > "$LOG_FILE"
fi

echo "=========================================================="
echo " Monitoramento do DSpace"
echo " Intervalo: ${INTERVALO}s"
echo " Log: $LOG_FILE"
echo "=========================================================="
echo ""
echo "Pressione CTRL+C para parar."
echo ""

while true; do

    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    # ------------------------------------------------------
    # CPU do servidor
    # ------------------------------------------------------

    CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | \
        awk '{print $8}' | sed 's/,/./')

    # Compatibilidade com máquinas que usam vírgula decimal
    CPU_IDLE=${CPU_IDLE/,/.}

    CPU_TOTAL=$(awk "BEGIN {printf \"%.2f\", 100 - $CPU_IDLE}")

    # ------------------------------------------------------
    # Memória
    # ------------------------------------------------------

    MEM_TOTAL=$(free -m | awk '/Mem:/ {print $2}')
    MEM_USED=$(free -m | awk '/Mem:/ {print $3}')

    MEM_PERCENT=$(awk \
        -v used="$MEM_USED" \
        -v total="$MEM_TOTAL" \
        'BEGIN {printf "%.2f", (used/total)*100}')

    # ------------------------------------------------------
    # Load average
    # ------------------------------------------------------

    LOAD=$(awk '{print $1","$2","$3}' /proc/loadavg)

    LOAD1=$(echo "$LOAD" | cut -d',' -f1)
    LOAD5=$(echo "$LOAD" | cut -d',' -f2)
    LOAD15=$(echo "$LOAD" | cut -d',' -f3)

    # ------------------------------------------------------
    # Swap
    # ------------------------------------------------------

    SWAP_TOTAL=$(free -m | awk '/Swap:/ {print $2}')
    SWAP_USED=$(free -m | awk '/Swap:/ {print $3}')

    if [ "$SWAP_TOTAL" -gt 0 ]; then
        SWAP_PERCENT=$(awk \
            -v used="$SWAP_USED" \
            -v total="$SWAP_TOTAL" \
            'BEGIN {printf "%.2f", (used/total)*100}')
    else
        SWAP_PERCENT="0"
    fi

    # ------------------------------------------------------
    # Função para obter CPU e memória dos containers
    # ------------------------------------------------------

    get_container_stats() {

        CONTAINER=$1

        RESULT=$(docker stats "$CONTAINER" \
            --no-stream \
            --format "{{.CPUPerc}}|{{.MemPerc}}|{{.MemUsage}}" 2>/dev/null)

        if [ -z "$RESULT" ]; then
            echo "0|0"
            return
        fi

        CPU=$(echo "$RESULT" | cut -d'|' -f1 | tr -d '%')
        MEM=$(echo "$RESULT" | cut -d'|' -f2 | tr -d '%')

        echo "$CPU|$MEM"
    }

    # ------------------------------------------------------
    # Coletar containers
    # ------------------------------------------------------

    UI=$(get_container_stats "ui")
    API=$(get_container_stats "api")
    DB=$(get_container_stats "dspacedb")
    SOLR=$(get_container_stats "dspacesolr")

    UI_CPU=$(echo "$UI" | cut -d'|' -f1)
    UI_MEM=$(echo "$UI" | cut -d'|' -f2)

    API_CPU=$(echo "$API" | cut -d'|' -f1)
    API_MEM=$(echo "$API" | cut -d'|' -f2)

    DB_CPU=$(echo "$DB" | cut -d'|' -f1)
    DB_MEM=$(echo "$DB" | cut -d'|' -f2)

    SOLR_CPU=$(echo "$SOLR" | cut -d'|' -f1)
    SOLR_MEM=$(echo "$SOLR" | cut -d'|' -f2)

    # ------------------------------------------------------
    # Gravar CSV
    # ------------------------------------------------------

    echo "$TIMESTAMP,$CPU_TOTAL,$MEM_PERCENT,$LOAD1,$LOAD5,$LOAD15,$SWAP_PERCENT,$UI_CPU,$UI_MEM,$API_CPU,$API_MEM,$DB_CPU,$DB_MEM,$SOLR_CPU,$SOLR_MEM" \
        >> "$LOG_FILE"

    # ------------------------------------------------------
    # Mostrar no terminal
    # ------------------------------------------------------

    clear

    echo "=========================================================="
    echo " DSPACE RESOURCE MONITOR"
    echo "=========================================================="
    echo "Data: $TIMESTAMP"
    echo ""
    echo "SERVIDOR"
    echo "----------------------------------------------------------"
    echo "CPU:       ${CPU_TOTAL}%"
    echo "Memória:   ${MEM_PERCENT}% (${MEM_USED}MB / ${MEM_TOTAL}MB)"
    echo "Load:      $LOAD1 / $LOAD5 / $LOAD15"
    echo "Swap:      ${SWAP_PERCENT}%"
    echo ""
    echo "CONTAINERS DSPACE"
    echo "----------------------------------------------------------"
    printf "%-15s %-10s %-10s\n" "CONTAINER" "CPU" "MEM"
    printf "%-15s %-10s %-10s\n" "ui" "${UI_CPU}%" "${UI_MEM}%"
    printf "%-15s %-10s %-10s\n" "api" "${API_CPU}%" "${API_MEM}%"
    printf "%-15s %-10s %-10s\n" "dspacedb" "${DB_CPU}%" "${DB_MEM}%"
    printf "%-15s %-10s %-10s\n" "dspacesolr" "${SOLR_CPU}%" "${SOLR_MEM}%"
    echo ""
    echo "Log: $LOG_FILE"
    echo ""
    echo "Próxima coleta em ${INTERVALO}s..."

    sleep "$INTERVALO"

done