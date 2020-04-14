var express = require('express')
var router = express.Router()
var Project = require('../models/project');

router.post("/ajouter", (req, res) => {
    var project = new Project(req.body);
    project.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});





module.exports = router;
