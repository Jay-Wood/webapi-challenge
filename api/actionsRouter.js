const express = "express";
const db = require("../data/helpers/actionModel.js");
const projectsDb = require("../data/helpers/projectModel.js");

const actRouter = require("express").Router();

actRouter.get("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;
    console.log("Proj ID: ", req.project_id)
    db.get(id)
        .then(actions => res.status(201).json(actions) )
        .catch( () => {
            res.status(500).json({ error: "The action information could not be retrieved." })
        })
})


//custom middleware
function validateProjectId(req, res, next) {
    let id = req.params.id;
    projectsDb.getById(id)
        .then(project => {
            if(project) {
                req.project_id = id
                next()
            } else {
                res.status(404).json({error: "No project with that ID exists"})
            }
        })
        .catch( () => {
            res.status(500).json({error: "Server Error"})
        })
};

module.exports = actRouter;