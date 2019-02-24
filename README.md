# LIRI-node-app
LIRI is a Language Interpretation and Recognition Interface. More specifically, LIRI is a command line node app that takes in parameters and gives you back data about songs, concerts and movies!

<strong> Video Demonstrations:</strong> 
- https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view (Duration: 8:54 min)
- https://drive.google.com/file/d/1sT4-YQOKWE5hORHVrJRwLY-f9Al2Zhp0/view (Duration: 1:04 min)

## Set-Up
LIRI is powered by and styled with NPM packages! After running `npm init -y` &mdash; to initialize the `package.json` file &mdash; proceed installing all of the following node packages:

### Node packages

  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

  * [Axios](https://www.npmjs.com/package/axios)

  * [Moment](https://www.npmjs.com/package/moment)

  * [DotEnv](https://www.npmjs.com/package/dotenv)

  * [inquirer](https://www.npmjs.com/package/inquirer)

  * [fs](https://www.npmjs.com/package/fs)

  * [colors](https://www.npmjs.com/package/colors)
  
## Files
### `.gitignore`
`.gitignore` file inclusive of the following lines was created to protect API keys and "secret" information.

```
node_modules
.DS_Store
.env
```

### `.env`
`.env` holds the values of my API keys and is used by the `dotenv` package to set the environment variables to the global `process.env` object in node. These are values specific to the computer on which node runs. External users will need to obtain their own spotify API key and create their own `.env` file.

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

### `liri.js`
`liri.js` is the LIRI game logic and includes the following code which reads and sets any environment variables with the dotenv package and also the code required to import the `keys.js` file and access the spotify keys information.

```js
require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
```

### `log.txt`
`log.txt` file currently logs all command line run, however, further development will log the output of each command line run. 

## How to Use Liri

liri.js takes in one of the following commands:

   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`
- This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal/bach window:
    
    ```
    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")
    ```
    <em>*If a band/artist isn't not provided or if the band/artist isn't touring, `inquirer` will prompt you to enter a new band/artist or exit out of the command so you can conduct a different search.</em>
    
2. `node liri.js spotify-this-song '<song name here>'`
- This will search the Spotify API for a song and render the following information about the song in the terminal/bash window:
   
    ```
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
    ```
    <em>*If no song is provided then LIRI will default to "The Sign" by Ace of Base!.</em>

3. `node liri.js movie-this '<movie name here>'` 
- This will search the OMDB API for a movie and render the following information to the terminal/bash window:

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
     <em>*If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'</em>

4. `node liri.js do-what-it-says`
- Using the `fs` Node package, LIRI will take the text inside of `random.txt` and then use it to call one of LIRI's commands. This will run for any of the commands.

### Future Development
1. Log output of each query to `log.txt` file
2. Include confirm-validated prompts using inquirer
`inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-validated'));`

### Add To Your Portfolio


