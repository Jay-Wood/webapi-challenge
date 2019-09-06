const express = "express";
const db = require("../data/helpers/projectModel.js");
const actionsDb = require("../data/helpers/actionModel.js");

const router = require("express").Router();
const actRouter = require("express").Router();

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

router.post("/", (req, res) => {
    const newProject = req.body;
    db.insert(newProject)
        .then( (project) => {res.status(200).json(project)})
        .catch( () => {
            res.status(500).json({error: "There was an error posting this project to the database."})
        })
})

router.put("/:id/", validateProjectId, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    console.log(id, update)
    db.update(id, update)
        .then(
            update => {
            res.status(200).json(update)
            }
        )
        .catch( () => {
            res.status(500).json({error: "There was a problem updating this post."})
        })
})

router.delete("/:id", validateProjectId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then( project => {
            res.status(200).json(project)
        })
        .catch( () => {
            res.status(500).json({error: "We couldn't delete that project."})
        })
})


//custom middleware
function validateProjectId(req, res, next) {
    let id = req.params.id;
    db.getById(id)
        .then(project => {
            if(project) {
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