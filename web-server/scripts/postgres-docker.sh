docker run --name parking-db -e "POSTGRES_USER=parking" -e "POSTGRES_PASSWORD=lot" -p 5432:5432 -v ~/Postgres15:/var/lib/postgresql/data -d postgres