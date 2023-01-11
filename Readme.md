1. Crear una base de datos en postgresql con nombre DATABASE_NAME

2. Situarse en la carpeta raiz del proyecto y ejecutar en terminal el comando "npm i"

2. Crear el archivo .env con las siguientes variables:

PORT=4000
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=0njLXVF5qTaOwGy-74ERnlZ3BZELxI_1
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=PG_USER generalmente "postgres"
PG_PASSWORD=PG_PASSWORD su contrasena de postgresql
PG_DB_NAME=DATABASE_NAME el nombre que eligio para la base de datos

3. ejecutar por terminal el comando "node ace migration:run" para crear las tablas en la base de datos.

4. ejecutar por terminal el comando "node ace serve --watch" para iniciar el proyecto.