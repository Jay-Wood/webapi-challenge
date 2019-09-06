const express = "express";
const db = require("../data/helpers/projectModel.js");
const actionsDb = require("../data/helpers/actionModel.js");

const router = require("express").Router();

router.get("/", (req, res) => {
    db.get()
        .then(projects => res.status(201).json(projects) )
        .catch( () => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
})

router.get("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(projects => res.status(201).json(projects) )
        .catch( () => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
})

router.post("/:id/projects", (req, res) => {
    const newProject = req.body;
    console.log(newProject)
    db.insert(newProject)
        .then( (project) => {res.status(200).json(project)})
        .catch( () => {
            res.status(500).json({error: "There was an error posting this project to the database."})
        })
})



//custom middleware
function validateProjectId(req, res, next) {
    let id = req.params.id;
    db.getById(id)
        .then(project => {
            if(project) {
                console.log("after then", project.id)
                req.project = project
                next()
            } else {
                res.status(404).json({error: "No project with that ID exists"})
            }
        })
        .catch( () => {
            res.status(500).json({error: "Server Error"})
        })
};


module.exports = router;