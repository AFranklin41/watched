## Watched

Watched is an app that is designed to make it easier to track media you have already seen. It stems from my own desire to track the media I've consumed, all in one place. 

Users can search for Shows or Movies and add them to a convenient list that can track season progress, episode progress, completion status, and the time in the show or movie you paused or stopped watching. 

## Installation

Visit https://github.com/AFranklin41/watched and clone the repository to your local machine. 

This app uses npm to install packages, you can get it here: https://www.npmjs.com/get-npm.

run this command in your terminal to install the prerequisite packages:

```
npm install
```

Once the packages are finished installing, you can start the local database with this command:

```
json-server -p 5002 -w api/watched.json
```

## Authentication

Make an Auth0 account for authentication by visiting https://auth0.com/. Make an AuthConfig.js file in the authentication folder, copy the text from the SampleAuthConfig.js file into it, and replace the domain name and client id with the information in your new Auth0 account.

## The Movie Database API

You'll need to register an account over at https://www.themoviedb.org/ and request a free API key.
