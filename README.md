<div align="center">

![letsvote](./letsvote.svg)

# `letsvote`

<h4><code>letsvote</code> is an online voting platform  for italian elections</h4>

</div>

<br />

This repository contains the implementation of the letsvote project for the software engineering course of UniTrento 2023/2024

# Building

Running the containers

```
docker compose up
```

Pushing database schema

```
cd backend
npm install
npx prisma generate
npx prisma db push
```

Creating admin user and test data

```
npx prisma db seed
```

# Environment

A `.env` file should have these variables defined

```
# Database
MONGO_INITDB_ROOT_USERNAME=<db_username>
MONGO_INITDB_ROOT_PASSWORD=<db_password>
DB_PORT=27017
MONGO_INITDB_DATABASE=letsvote
DATABASE_URL="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@db:${DB_PORT}/letsvote?authSource=admin&directConnection=true"
INIT_WAIT_SEC=4

# Cache
REDIS_USERNAME=<redis_username>
REDIS_PASSWORD=<redis_password>
REDIS_PORT=6379

# Backend
BE_PORT=4000
JWT_SECRET=<jwt_secret>
SA_EMAIL=<sys_admin_email>
SA_PASSWORD=<sys_admin_password>
BE_DATABASE_URL="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${DB_PORT}/letsvote?authSource=admin"

# Frontend
FE_PORT=3000
API_URL=http://localhost:${BE_PORT}/api
```
