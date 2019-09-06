const express = require("express");

const projectRouter = require("./api/projectsRouter.js");
const actionRouter = require("./api/actionsRouter.js");

const server = express();

server.use(express.json());
server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.get("/", (req, res) => {
    res.send("We here")
});

//add validateId function

module.exports = server;


