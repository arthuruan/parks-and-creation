#!/bin/bash

docker exec -it parking-db psql -U parking -c "CREATE DATABASE parks;"