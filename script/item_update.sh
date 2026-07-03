#!/bin/bash

HANDLE=$1
PDF=$2

# Verifica se o diretório existe
if docker exec "api" test -d "/dspace/item"; then
    if docker exec "api" test -d "/dspace/item/1"; then
        docker exec "api" rm -rf "/dspace/item/1";
        echo "OK: Diretório '/dspace/item/1' removido com sucesso."
    fi
else 
    echo "Criando diretório '/dspace/item'..."
    docker exec "api" mkdir -p "/dspace/item"
fi

echo "Exportando item $HANDLE..."
if docker exec "api" bash -c "/dspace/bin/dspace export -t ITEM -d /dspace/item -n 1 -i $HANDLE"; then
    echo "OK: Item exportado com sucesso."
    docker cp /home/${PDF} api:/dspace/item/1/
    sed -i "s|^[^[:space:]]*|$PDF|" /home/contents
    echo "OK: PDF: ${PDF} copiado com sucesso."
    
else
    echo "ERRO: Não foi possível exportar o item."
    exit 1
fi