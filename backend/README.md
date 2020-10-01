# Backend

This is the page's backend.

## Usage
To get the backend working you need to have a working psql server and fill its information to .env

To get up and running run:
``` bash
$ npm install
$ npm start
```
Yes, that's it. Only two commands!

## Configuration
All the configurations are in the .env file

## Important Files ##
Here are a few important files for the backend

### index.js ###
All the routing and most of the server logic is here. This is considered the main file of the backend.

### db.js ###
All database operations happen here.

### mail.js ###
Sending emails and stuff

### utils.js ###
General utils for the backend.
For example creating ciphers for links.
