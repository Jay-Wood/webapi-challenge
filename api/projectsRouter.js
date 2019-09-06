const express = "express";
const db = require("../data/helpers/projectModel.js");
const actionsDb = require("../data/helpers/actionModel.js");

const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("Get to projects works")
    db.get()
        .then(projects => res.status(201).json(projects) )
        .catch( () => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
})

router.get("/:id", validateProjectId, (req, res) => {
    console.log("Get to projects with ID works")
    const id = req.params.id;
    console.log("id in get: ", db.get(id))
    db.get(id)
        .then(projects => res.status(201).json(projects) )
        .catch( () => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
})

// router.post("")



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