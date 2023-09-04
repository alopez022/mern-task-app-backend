const Task = require("../models/modelTask");
const mongoose = require("mongoose");

//Create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
};

//Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
};

//Get single task
const getTask = async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json(`Invalid task ID: ${id}`);
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json(`No tasks with id ${id}`);
        }

        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        
        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json(`Invalid task ID: ${id}`);
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json(`No tasks with id ${id}`);
        }
        
        res.status(200).json("Task deleted");
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

// Update a task
const udpateTask = async (req, res) => {
    try {
        const {id} = req.params;
        
        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).json(`Invalid task ID: ${id}`);
        }

        const task = await Task.findByIdAndUpdate(
            {_id: id}, req.body, 
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json(`No tasks with id ${id}`);
        }
        
        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    udpateTask
}