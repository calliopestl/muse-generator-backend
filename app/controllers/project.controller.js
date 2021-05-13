const db = require('../models');
const Project = db.projects;


exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty!"});
        return
    }



// create a project 

const project = new Project({
    title: req.body.title,
    generated: req.body.generated,
    notes: req.body.notes
});

// save project in db
project
    .save(project)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occured while creating your project."
        });
    });
};


// retrieve all projects from the db
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Project.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      });
  };

// find a single project with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Project.findById(id)
    .then(data => {
        if (!data)
        res.status(404).send({ message: "Not found Project with id " + id});
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving project with id " + id});
    });
};

// update a project by the id in req
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }
    const id = req.params.id;

    Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Project with id=${id}. Maybe Project was not found!`
          });
        } else res.send({ message: "Project was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Project with id=" + id
        });
      });
  };

// delete a project with specd id

exports.delete = (req, res) => {
    const id = req.params.id;

    Project.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot delete Project with id ${id}`});
        } else {
            res.send({ message: "Project was deleted successfully!"});
        }
        
    })
    .catch(err => {
        res.status(500).send({message: "Could not delete Project with id " + id });
    });

};

// delete all from db

exports.deleteAll = (req, res) => {
    Project.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Projects were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while removing all projects."
        });
    });
};

exports.findAllPublished = (req, res) => {

};


