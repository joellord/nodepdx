//Web server
var express = require("express");
var app = express();
var server = require("http").createServer(app);

var ip = require("./helpers/ip");
var twit = require("twit");
var longProcess = require("./helpers/longProcess");
var creds = require("./helpers/creds");

var keywords = "#nodepdx";

//Web socket
var io = require("socket.io")(server);
var port = 8888;

//Start server
server.listen(port, function () {
    console.log("Server started on port " + port);
});

//Serve from parent directory
app.use(express.static(__dirname + "/../client"));
//Serves the IP address for the getIp helper
app.get("/ip", function(req, res) {
    res.send(ip);
});
//Serves the keyword(s) that we are tracking
app.get("/keywords", function(req, res) {
    res.send(keywords);
});

//Twitter Stream listener
var t = new twit(creds.twitter);

var stream = t.stream("statuses/filter", {track: keywords});

io.sockets.on("connection", function (socket) {
    socket.on("longProcess:start", function (data) {
        var proc = new longProcess(io, socket.id);
        proc.process();
    });
});

stream.on("tweet", function (tweet) {
    io.emit("tweet", tweet);
});