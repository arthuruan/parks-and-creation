#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE parks;
    \c parks;
    GRANT ALL PRIVILEGES ON DATABASE parks TO parking;
EOSQL