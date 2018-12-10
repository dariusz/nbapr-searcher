# NBA APR Searcher

Searches for 'nba power rankings' on Google and tries to parse the ranks from the results.  Puts the results in a SQLite database for now.

## Setup

Install dependencies using ..

`npm install`

.. create the SQLite database ..

`npm run db:create-dev`

.. and migrate / add tables + views ..

`npm run db:up`

## Running

The run the service:

`npm run start`

## Development

This app is written in TypeScript.  It uses SQLite for data storage. A to-do is to use something else for production data storage.

To watch for changes while developing:

`npm run watch`