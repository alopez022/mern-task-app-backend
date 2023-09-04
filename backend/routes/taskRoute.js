const express = require("express");
const Task = require("../models/modelTask");
const { createTask, getTasks, getTask, deleteTask, udpateTask } = require("../controllers/taskController");
const router = express.Router();

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .delete(deleteTask)
    .put(udpateTask)
    .patch(udpateTask);

module.exports = router;