#!/bin/bash

HANDLE=$1
PDF=$2

# Verifica se o diretório existe
if docker exec "api" test -d "/dspace/exports"; then
    if docker exec "api" test -d "/dspace/exports/1"; then
        docker exec "api" rm -rf "/dspace/exports/1";
        echo "OK: Diretório removido com sucesso."
    fi
else 
    echo "Criando diretório ..."
    docker exec "api" mkdir -p "/dspace/exports"
fi

echo "Exportando item $HANDLE..."
if docker exec "api" bash -c "/dspace/bin/dspace export -t ITEM -d /dspace/exports/ -n 1 -i $HANDLE"; then
    echo "OK: Item exportado com sucesso."
    echo "Removendo bitstream ORIGINAL..."
    docker exec "api" bash -c "./bin/dspace itemupdate -e ri@inpa.gov.br -s /dspace/exports/ -D ORIGINAL"
    docker cp /home/${PDF} api:/dspace/exports/1/
    sed -i "s|^[^[:space:]]*|$PDF|" /home/contents
    docker cp /home/contents api:/dspace/exports/1/
    echo "Arquivos copiados com sucesso."
    echo "Atualizando item $HANDLE..."
    if docker exec "api" bash -c "./bin/dspace itemupdate -e ri@inpa.gov.br -s /dspace/exports/ -A"; then
        echo "OK: Item atualizado com sucesso."
        echo "Indexando item $HANDLE..."
        docker exec "api" bash -c "./bin/dspace filter-media -i $HANDLE"

    else
        echo "ERRO: Não foi possível atualizar o item."
        exit 1
    fi
    
else
    echo "ERRO: Não foi possível exportar o item."
    exit 1
fi