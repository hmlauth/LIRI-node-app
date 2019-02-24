# LIRI-node-app
LIRI is a Language Interpretation and Recognition Interface. More specifically, LIRI is a command line node app that takes in parameters and gives you back data about songs, concerts and movies!

<strong> Video Demonstrations:</strong> 
- https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view (Duration: 8:54 min)
- https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view (Duration: 1:04 min)

### App Set-Up
LIRI is powered by NPM packages, particularly the `axios` package to the Bands in Town, Spotify and OMDB APIs. Using these APIs, LIRI searches <strong>Spotify</strong> for songs, <strong>Bands in Town</strong> for concerts, and <strong>OMDB</strong> for movies. Additional NPM packages like `inquirer` and `fs` were installed for improved functionality and also `moment` and `colors` for formatting and styling. 

## Files
`.gitignore` file inclusive of the following lines was created to protect API keys and "secret" information.

```
node_modules
.DS_Store
.env
```

`.env` holds the values of my API keys and is used by the `dotenv` package to set the environment variables to the global `process.env` object in node. These are values specific to the computer on which node runs. External users will need to obtain their own spotify API key and create their own `.env` file.

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

`liri.js` is the LIRI game logic and includes the following code which reads and sets any environment variables with the dotenv package...

```js
require("dotenv").config();
```
...as well as code required to import the `keys.js` file and access the spotify keys information..

```js
  var keys = require("./keys.js");
  var spotify = new Spotify(keys.spotify);
 ```
  
`log.txt` file currently logs all command line run, however, further development will log the output of each command line run. 

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


## How to Use Liri

1. Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal/bach window:
    
    ```
    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")
    ```
    *If a band/artist isn't not provided or if the band/artist isn't touring, `inquirer` will prompt you to enter a new band/artist or exit out of the command so you can conduct a different search.
    
2. `node liri.js spotify-this-song '<song name here>'`

   * This will search the Spotify API for a song and render the following information about the song in the terminal/bash window:
   
    ```
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
    ```
    *If no song is provided then LIRI will default to "The Sign" by Ace of Base!.

3. `node liri.js movie-this '<movie name here>'`

   * This will search the OMDB API for a movie and render the following information to the terminal/bash window:

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

  * Using the `fs` Node package, LIRI will take the text inside of `random.txt` and then use it to call one of LIRI's commands. This will run for any of the commands.

5. All commands (and outputs) are logged to `log.txt` file.

### Future Development
1. Log output of each query to `log.txt` file
2. Include confirm-validated prompts using inquirer
`inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-validated'));`

### Create a README.md
### Add To Your Portfolio


