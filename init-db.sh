#!/bin/bash

# Espera o SQL Server iniciar completamente
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "SenhaSuperForte!2025" -Q "SELECT 1" > /dev/null 2>&1
do
  echo "⏳ Aguardando SQL Server iniciar..."
  sleep 2
done

# Cria o banco de dados se ele ainda não existir
echo "✅ Criando banco de dados, se necessário..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "SenhaSuperForte!2025" -Q "IF DB_ID('SistemaLoginDb') IS NULL CREATE DATABASE SistemaLoginDb"
