# StoreFront

Full Stack Developer Nanodegree, create a node based API to support a frontend store website. 

## Introduction/API Functionality

The project is written in Typescript, Node/Express for the application logic, dotenv for environmental variables, db-migrate for migrations, Jsonwebtoken for JWT and Jasmine for testing.

Middleware was written to verify JWT validity and check for unique usernames at account creation.

Using npm, scripts were written to create test databases and run Jasmine test specs.


## Installation, Environment Setup

Clone the repository.

After cloning, run the following script from a terminal in the cloned directory: 

 ```npm install```

It may be necessary to install db-migrate globally, i.e.
````
npm intstall -g db-migrate
````

## Setup PostgresSQL

The following environment variables ``.env`` are required for Postgres and the subsequent project to function correctly.

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

Once these are set, start an instance of Postgres, ensure Postgres is started on port 5432.

### Setup the required databases

In order to use the API you must pre-configure the initial database.
To do so access the `psql` prompt as ``postgres`` on the installed Postgres database and enter the following commands at the prompt:

```
CREATE DATABASE storefront;
CREATE USER storefront_admin WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mystore TO storefront_admin;
```

### Setting the environmental variables
In the root directory of the cloned repository create a file with the name ``.env`` .
Copy the following into the file:

```
    POSTGRES_HOST=127.0.0.1  //or whereever the Postgres database is located
    
    DB_HOST=127.0.0.1
    DB_NAME=storefront

    DB_USER=storefront_admin
    DB_PASSWORD=password

    ENV=dev

    TEST_DB_NAME=test

    PEPPER=thisismytotallysecretpepper
    SALT_ROUNDS=2
    TOKEN_SECRET=skhsihsias

```
The environmental variables can be adjusted dependent on your specific needs, but the given variables will allow automatic Jasmine testing.


## **Data Migration**

A data migration file is included with the project in:

```
/data_migration/initialization.sql
```

That includes several entries that you can use to experiment with the project.

Please run the following command after running the schema migrations

```
psql -U USER -d DB -a -f  PATH
```

And replace the following keywords:

**USER** with your postgreSQL user ex: **postgres**

**DB** with your database name ex: **udacity_hub**

**PATH** with your data migration file path ex:
**C:\Udacit-Hub\data_migrations\initialization.sql**

Or **cd** into the directory of the script and then just using the name of the script.

So the end result is something like this:

```
psql -U postgres -d udacity_hub -a -f initialization.sql
```

<br />

## Running the Jasmine Tests

To run the jasmine tests use the following commands: 
```
npm run test
```


## Technologies Used

- Node (asynchronous endpoints for API access)
- Express (for creating endpoints, routing, and serving files)
- TypeScript throughout the API
- Javascript (async, express, middleware, etc in a modular design)
- Jasmine (for JS testing)
- Jason Web Token (JWT) for stateless interaction
- Basic Error handling
- Misc. middle ware, checking username, handling authentication
