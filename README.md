# LIRI-node-app
LIRI is a Language Interpretation and Recognition Interface. More specifically, LIRI is a command line node app that takes in parameters and gives you back data about songs, concerts and movies!

<strong> Video Demonstration:</strong> https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view
- Additional Detail: https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view

### App Set-Up
LIRI is powered by NPM packages, particularly the `axios` package to the Bands in Town, Spotify and OMDB APIs. Using these APIs, LIRI searches <strong>Spotify</strong> for songs, <strong>Bands in Town</strong> for concerts, and <strong>OMDB</strong> for movies. Additional NPM packages like `inquirer` and `fs` were installed for improved functionality and also `moment` and `colors` for formatting and styling. 

## Files
To ensure git did not track certain files and also protect API keys and "secret" information, a `.gitignore` file inclusive of the following lines was created.

```
node_modules
.DS_Store
.env
```

`.env` holds the values of my API keys and is used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```
* If someone wanted to clone your app from github and run it themselves, they would need to supply their own `.env` file for it to work.

5. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

```js
require("dotenv").config();
```

8. Add the code required to import the `keys.js` file and store it in a variable.

```js
  var keys = require("./keys.js");
```
  
* You should then be able to access your keys information like so

  ```js
  var spotify = new Spotify(keys.spotify);
  ```
  
* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

## Node packages
### Primary

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * Axios is used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
### Secondary

  * [inquirer](https://www.npmjs.com/package/inquirer)
  * [fs](https://www.npmjs.com/package/fs)
  * [colors](https://www.npmjs.com/package/colors)

## Future Development
- including confirm-validated prompts using inquirer
`inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-validated'));`

__________________________________
### How to Use Liri

1. Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal/bach window:

     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window:

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   *If no song is provided then LIRI will default to "The Sign" by Ace of Base!

   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   *If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. This will run for any of the commands.

5. logging

### Create a README.md

### Add To Your Portfolio


- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**

