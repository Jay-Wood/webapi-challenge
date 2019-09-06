const express = require("express");

//add router const Router = require("...")

const server = express();

server.use(express.json());
//server.use("", Router name from above);

server.get("", (req, res) => {
    res.send("We here")
});

//add validateId function

module.exports = server;


