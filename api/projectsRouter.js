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

router.get("/:id", (req, res) => {
    console.log("Get to projects with ID works")
    const id = req.params.id;
    db.get(id)
        .then(projects => res.status(201).json(projects) )
        .catch( () => {
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
})


module.exports = router;