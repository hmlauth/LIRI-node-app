// dependencies
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var fs = require("fs");
var inquirer = require("inquirer");
inquirer.registerPrompt('confirm-validated', require('inquirer-confirm-validated'));

// inputs
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);
// styling 
var colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    info: 'magenta',
    warn: 'yellow',
    notice: 'green'
  });

// FUNCTIONS
function getInstructions() {
    console.log(colors.info.underline.bold("\nWelcome to" + " LIRI!".silly + "\n\n"));
    console.log(colors.verbose("Enter".dim + " spotify-this-song".italic + ", ".dim + "concert-this".italic + ", ".dim + "movie-this".italic + ", or ".dim + "do-what-it-says".italic + " and then the song, concert,\n or movie that you'd like more information about!\n\nFor example, try:".dim + ("\n\n\tspotify-this-song".italic + " Move that Body").bold + "\n\n\t\tor\n\n".dim + ("\tconcert-this".italic + " Ariana Grande\n").bold));
};

function getSpotifyInfo() {
    if (input2 === "") {
        input2 = "The Sign, Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: input2,
        limit: 1,
    }).then(function (response) {
        var artist = response.tracks.items[0].artists[0].name;
        var song = response.tracks.items[0].name;
        var previewLink = response.tracks.items[0].external_urls.spotify;
        var album = response.tracks.items[0].album.name;

        console.log("\n=================================================================================\n".verbose);
        console.log((" " + input2.toUpperCase() + " ").inverse + "\n");
        console.log("Artist: ".info.dim + artist.info);
        console.log("Song: ".info.dim + song.info);
        console.log("Preview Song: ".info.dim + previewLink.info);
        console.log("Album: ".info.dim + album.info + "\n");

        addToLog();
            fs.appendFile("log.txt", 
                "\n\tArtist: " + artist + "\n\tSong: " + song + "\n\tPreview Song: " + previewLink + "\n\tAlbum: " + album,
                function(err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );
    }).catch(function (err) {
        console.log(err);

        });
}

function getConcertInfo() {
    if (input2 === "") {
        console.log("\n=================================================================================\n".verbose);
        console.log(" Please enter an artist's name. ".warn.bold.bgBlack + "\n")
    }
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp").then(function (response) {
        var results = response.data;
        if (response.data.length === 0) {
            console.log("\n=================================================================================\n".verbose);
            inquirer
                .prompt ([
                    {
                        type: "input",
                        message: (("This band isn't touring right now! Try searching for a different band.\n" + "(Press ctrl c to exit and start new search)".dim).notice + "\n"),
                        name: "newBand",
                    }
                ]).then(function(inquirerResponse) {
                    input2 = inquirerResponse.newBand;
                    getConcertInfo(input2);
                })
        } else {
            for (i = 0; i < results.length; i++) {
                var currentResult = results[i];
                var venueName = currentResult.venue.name;
                var venueLocation = currentResult.venue.city + ", " + currentResult.venue.region + ", " + currentResult.venue.country;
                var eventDate = moment(currentResult.datetime);
                eventDate = eventDate.format("MM/DD/YYYY");
            }
        console.log("\n=================================================================================\n".verbose);
        console.log((" " + input2.toUpperCase() + "'s next concert is at: ").inverse);
        console.log("\nVenue Name: ".info.dim + venueName.info + "\nVenue Location: ".info.dim + venueLocation.info + "\nDate: ".info.dim + eventDate.info + "\n");

        addToLog();
            fs.appendFile("log.txt", 
                "\n\tVenue Name: " + venueName + "\n\tVenue Location: " + venueLocation + "\n\tDate: " + eventDate,
                function(err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );

        }
    })   
};

function getMovieInfo() {
    if (input2 === "") {
        input2 = "Mr. Nobody";
    };

    axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=trilogy").then(
        function (response) {
            var results = response.data;
            var title = results.Title;
            var year = results.Year;
            var imdbRating = results.imdbRating;
            var rating = results.Ratings[1].Value;
            var country = results.Country;
            var language = results.Language;
            var plot = results.Plot;
            var actors = results.Actors;console.log("\n=================================================================================\n".verbose);
            console.log(("\n " + input2.toUpperCase() + " ").inverse + "\n");
            console.log("Title: ".info.dim + title.info + "\nRelease Year: ".info.dim + year.info + "\nIMDB Rating: ".info.dim + imdbRating.info + "\nRotten Tomatoes: ".info.dim + rating.info + "\nCountry: ".info.dim + country.info + "\nLanguage: ".info.dim + language.info + "\nPlot: ".info.dim + plot.info + "\nActors: ".info.dim + actors.info + "\n");

            addToLog();
            fs.appendFile("log.txt", 
                "\n\tTitle: " + title + "\n\tRelease Year: " + year + "\n\tIMDB Rating: " + imdbRating + "\n\tRotten Tomatoes: " + rating + "\n\tCountry: " + country + "\n\tLanguage: " + language + "\n\tPlot: " + plot + "\n\tActors: " + actors + "\n\t",
                function(err) {
                    if (err) {
                        return console.log(err);
                    }
                }
            );

        }
    );
};

function readRandomFile() {
    fs.readFile("random.txt","utf8", function(error, data) {
        if (error) {
            return console.log(error);
        };

        var dataArr = data.split(",");
        input1 = dataArr[0];
        input2 = dataArr[1].replace(/['"]+/g, '');
        /* Remove quotes from string
        (resource: https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string) */

        if (input1 === "spotify-this-song") {
            getSpotifyInfo(input2);
        } else if (input1 === "concert-this") {
            getConcertInfo(input2);
        } else if (input1 === "movie-this") {
            getMovieInfo(input2);
        } else if (input1 === "do-what-it-says") {
            readRandomFile(input2);
        };

    });
}

function addToLog() {
    fs.appendFile("log.txt", 
    "\n\nSearch Command: " + input1 + " " + input2, 
    function(err) {
        if (err) {
            return console.log(err);
        }
    });
};  

// METHODS
if (!input1 && !input2 || input1 === "instructions") {
    getInstructions();
} else if (input1 === "spotify-this-song") {
    getSpotifyInfo();
} else if (input1 === "concert-this") {
    getConcertInfo();
} else if (input1 === "movie-this") {
    getMovieInfo();
} else if (input1 === "do-what-it-says") {
    readRandomFile();
};