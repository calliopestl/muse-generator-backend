module.exports = app => {
    const projects = require("../controllers/project.controller.js");

    let router = require('express').Router();

    // create new project
    router.post("/", projects.create);
    
    //retrieve all projects
    router.get("/", projects.findAll);
    //retrieve a single project from id
    router.get("/:id", projects.findOne);
    
    //update with id
    router.put("/:id", projects.update);
    
    //delete with id
    router.delete("/:id", projects.delete);
    
    // deleete all 
    router.delete("/", projects.deleteAll);
    
    app.use('/api/projects', router);
};

