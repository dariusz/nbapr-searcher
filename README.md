# NBA APR Searcher

Searches for 'nba power rankings' on Google and tries to parse the ranks from the results.  Puts the results in a SQLite database for now.

## Setup

Install dependencies using ..

`npm install`

.. and migrate the database ..

`npm run db:create`
`npm run db:up`

## Running

To run the service:

`npm run start`

## Development

This service is written in TypeScript.  It uses SQLite for data storage. A to-do is to use something else for production use.
To watch for changes while developing:

`npm run watch`