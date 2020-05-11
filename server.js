// DEPENDENCIES
var express = require("express");
var path = require("path");
var fs = require('fs');
var uuid = require("uuid");

// Sets up the Express App
var app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//to store notes in an array
const notes = [];

// ROUTING
// Route for when user first visits page
// API GET Route -

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
    return res.json(notes);
  });


// API POST route
app.post("/api/notes", function(req, res) {
    let userNote = req.body;
    userNote.id = uuid();

    let savedNotes = JSON.parse(fs.readFile(path.join(__dirname, "/db/db.json")));
    savedNotes.push(userNote);

    let arrNote = JSON.stringify(savedNotes);
    fs.writeFile(path.join(__dirname, "./db/db.json"), arrNote, `utf8`, function (error) {
        if (err){
         console.log( "You have an Error");
     } else { 
         return res.json(userNote);
         console.log("Your note has been saved");
        }
    });
    
    notes.push(req,body);
    res.json(true);
});

// API DELETE route
app.delete("/api/notes:id", function(req, res) {
    
    let deleteNoteId = req.params.id;
    let deleteNote = savedNotes.filter(note => userNote.id != deleteNoteId);
    if(deleteNote){
        data=deleteNotes;
        res.json(data);
    }  
});


// LISTENER - starts server

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});