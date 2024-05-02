/* ****************Importing Required Modules/Packages***************** */
const express = require("express")
const mongoose = require("mongoose")
const Songdetails = require("./Songdetails")
const app = express()

/* ******************Configuring Middleware(s)***************** */
app.use(express.json())


/* ******************Defining Configuration Variables***************** */
const db_connection = "mongodb://127.0.0.1:27017/Music123";
const port = 2324


/* *********************Defining Routs and Controllers********************* */

// c. Insert array of 5 song documents in Collection. 
// h. Add new song which is your favorite.
app.post("/add", async function (request, response) {
    // get data from body
    const { Songname, Film, Music_director, singer } = request.body
    const song = await Songdetails.create({ Songname, Film, Music_director, singer })
    response.send({ message: "Data Is Inserted", song })
})

// d. Display total count of documents and List all the documents in browser.
app.get("/displayCountAndDocuments", async function (request, response) {
    const songs = await Songdetails.find()
    response.send({ "total count": songs.length, songs })
})

// e. List specified Music Director songs.
// localhost:2324/getSongsOfDirector/saif
app.get("/getSongsOfDirector/:directorName", async function (request, response) {
    const directorName = request.params.directorName
    const songs = await Songdetails.find({ Music_director: directorName })
    response.send(songs)
})

// g. Delete the song which you don’t like. 
app.delete("/delete/:songName", async function (request, response) {
    const songName = request.params.songName
    const result = await Songdetails.deleteOne({ Songname: songName })
    response.send({ message: "song is deleted successfully", result })
})


// k. Display the data in Browser in tabular format.
app.get("/displayAllSongsInTable", async function (request, response) {
    const songs = await Songdetails.find()

    // creating table view for browser
    let html = "<table border=1 style='border-collapse: collapse'>" // style tag is used to avoid double border on table
    // creating headers **BackTick (`) is used for creating multiline string**
    html = html + `<tr>
        <th>Songname</th>
        <th>Film</th>
        <th>Music_director</th>
        <th>singer</th>
        <th>Actor</th>
        <th>Actress</th>
    </tr>`
    songs.map(function (song) {
        html = html + "<tr>"

        html = html + "<td>" + song.Songname + "</td>"
        html = html + "<td>" + song.Film + "</td>"
        html = html + "<td>" + song.Music_director + "</td>"
        html = html + "<td>" + song.singer + "</td>"
        html = html + "<td>" + song.Actor + "</td>"
        html = html + "<td>" + song.Actress + "</td>"

        html = html + "</tr>"
    })
    html = html + "</table>"

    response.send(html)
})

/* ***********Database Connection And Starting Express Server********** */
console.log("waiting for database to connect. after connection server will start...")
mongoose.connect(db_connection)
    .then(() => {
        app.listen(port, function () {
            console.log(">>>> Database connected successfully and server is started")
            console.log("http://localhost:" + port)
        })
    })
    .catch((error) => {
        console.log("problem to connect with database")
        console.log(error)
    })
