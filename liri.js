console.log("liri.js is loaded");

require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var fs = require("fs");

var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");
console.log(input2);

var spotify = new Spotify(keys.spotify);

if (input1 === "spotify-this-song") {
    getSpotifyInfo();
} else if (input1 === "concert-this") {
    getConcertInfo();
} else if (input1 === "movie-this") {
    getMovieInfo();
} else if (input1 === "do-what-it-says") {
    readRandomFile();
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

        console.log("\n=================\n");
        console.log("Artist: " + artist);
        console.log("Song: " + song);
        console.log("Preview Song: " + previewLink);
        console.log("Album Name: " + album);
        console.log("\n=================\n");

    })
        .catch(function (err) {
            console.log(err);
        });
}

function getConcertInfo() {
    if (input2 === "") {
        console.log("\n=================\n");
        console.log("Please enter an artist's name")
        console.log("\n=================\n");
    }
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp").then(function (response) {
        var results = response.data;
        if (response.data.length === 0) {
            console.log("\n=================\n");
            console.log("This band isn't in town! Is there another that you want to see?");
            console.log("\n=================\n");
        } else {
            for (i = 0; i < results.length; i++) {
                var currentResult = results[i];
                var venueName = currentResult.venue.name;
                var venueLocation = currentResult.venue.city + ", " + currentResult.venue.region + ", " + currentResult.venue.country;
                var eventDate = moment(currentResult.datetime);
                eventDate = eventDate.format("MM/DD/YYYY");
            }
        console.log("\n=================\n");
        console.log("\nVenue Name: " + venueName + "\nVenue Location: " + venueLocation + "\nDate: " + eventDate);
        console.log("\n=================\n");
        }
    })   
};

function getMovieInfo() {
    if (input2 === " ") {
        input2 === "Mr. Nobody";
    };

    axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=trilogy").then(
        function (response) {
            var results = response.data;
            console.log(results);
            var title = results.Title;
            var year = results.Year;
            var imdbRating = results.imdbRating;
            var rating = results.Ratings[1].Value;
            var country = results.Country;
            var language = results.Language;
            var plot = results.Plot;
            var actors = results.Actors;

            console.log("\n=================\n");
            console.log("\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + imdbRating + "\nRotten Tomatoes: " + rating + "\nCountry: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors);
            console.log("\n=================\n");
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
        input2 = dataArr[1];

        getSpotifyInfo(input2);

    });
}