const express = "express";
const db = require("../data/helpers/actionModel.js");
const projectsDb = require("../data/helpers/projectModel.js");

const actRouter = require("express").Router();

db.get("/", (req, res) => {
    console.log("Get to actions works")

})


module.exports = actRouter;