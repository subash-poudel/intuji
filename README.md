# Intuij Assignment

## Tech Stack
 * Typescript
 * Docker
 * Postgresql
 * Express
 * Postman

## Notable library used
* Joi for request validation
* Knex for database migration and seeds(seeds not working after latest db changes)
* Jest for unit tests
* rrule for recurrence implementation for calendar

## Tasks not done:
* RSVP Management for Participants
* Special User Limitation

## Installation
* Clone this repository
```
docker compose up --build
npx knex migrate:latest
```

* Database connection string
```
jdbc:postgresql://localhost:5432/postgres
```

* Import postman collection and environment to test

I did work a little bit on FE integration but is incomplete.