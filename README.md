# Booking System

Booking System for Limited Room Usage

## Environment Development

```bash
node version => 16.13.2
npm version => 8.4.0
postgres => PostgreSQL 14
```

## Installation

```bash
#   Run npm command to install package
npm i

#   Remove word "copy" in .env copy

#   Create Database in our Postgres DB GUI (PgAdmin / etc)

#   Change DATABASE_URL in .env to our Database Configuration
DATABASE_URL = "DATABASE_TYPE://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

#   Do migration table to our database that been created
npx prisma migrate dev

#   Add seeder data to our table
npx prisma migrate reset

#   To run the program
npm start
```

## User Access

```bash
Admin

email: admin@booking-system.com
pass: admin

Karyawan

email: karyawan@booking-system.com
pass: karyawan
```

## Postman Environment

```bash
# Depend on our setting on the server.js
url: http://localhost:3000
access_token:
prefix: api/v1
```

## License
[MIT](https://choosealicense.com/licenses/mit/)