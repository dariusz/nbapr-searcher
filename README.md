# NBA Power Rankings Search Service

Searches for 'nba power rankings' on Google and tries to parse the ranks from the results.  Puts the results in a SQLite database for now.

## Setup

Install dependencies using ..

`npm install`

.. create the SQLite database ..

`npm run db:create-dev`

.. migrate / add tables + views ..

`npm run db:up`

.. finally build the app from source ..

`npm run build`

## Running

Then run the service:

`npm run start`

## Development

This app is written in TypeScript.  It uses SQLite for data storage. A to-do is to use something else for production data storage.

It uses a lightly modified version of tslint-recommended for code style, including in the DB migrations:

`npm run lint`

To watch for changes while developing:

`npm run watch`

... and check `package.json` for the database migration commands.