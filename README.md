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

Check out the FAQ here: https://www.themoviedb.org/faq/api. 

Once you have your key, open up the modules folder in VScode or your program of choice, and create a file called
```
ApiKey.js
```

Inside, paste this code:
```
const apiKey = "xxxxxxxxxxxx";

export default apiKey
```

and replace xxxxxxxxxxxx with your key. 

Once you've done so, save and run the command
```
npm start
``` 
to start the app!

## Splash Page and Login

You'll need to sign in to access the app's features. You can do so with the sign in button at the top right. You can sign in with google or create an account.

![alt text](https://i.imgur.com/3au3E2I.jpg "Splash page")

## Show & Movie Lists

Once you're signed in, you can immediately begin searching for movies or shows by click on their respective buttons on the navbar. This will take you to your show or movie list. You can sort by Title(alphabetical), Date Watched, and Completion status by click the respective bars. 

![alt text](https://i.imgur.com/YlXnXWt.png "Show List")

## Search

From there you can click add show or movie and search the movie database for the show or movie you'd like to add! 

![alt text](https://i.imgur.com/aPjR0Kx.png "Show Search")

## Statistics

Here you can see some statistics about your completion rate of shows and movies. This will be expanded in the future to include average rate of completion, overall time spent watching media, and more interesting stats.

~[alt text](https://i.imgur.com/wiIZU5o.png "Stats")

## Built with

⋅⋅* [React](https://reactjs.org/)
⋅⋅* [React Semantic UI](https://react.semantic-ui.com/)
⋅⋅* [Recharts](http://recharts.org/en-US/)
⋅⋅* [npm](https://www.npmjs.com/get-npm)

##Author 

Alex Franklin

https://github.com/AFranklin41/

