#!/bin/bash

CONTAINER="api"
DIR="/dspace/item"

# Verifica se o diretório existe
if docker exec "api" test -d "/dspace/item"; then
    if docker exec "api" test -d "/dspace/item/1"; then
        docker exec "api" rm -rf "/dspace/item/1";
        echo "OK: Diretório '/dspace/item/1' removido com sucesso."
    fi
fi

echo "Exportando item..."
if docker exec "api" bash -c "/dspace/bin/dspace export -t ITEM -d ./item -n 1 -i inpa/128"; then
    echo "OK: Item exportado com sucesso."
else
    echo "ERRO: Não foi possível exportar o item."
    exit 1
fi