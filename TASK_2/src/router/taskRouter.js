const express = require("express");
const { Task } = require("../models/schema");

const taskRouter = express.Router();

taskRouter.post("/tasks", async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const task = new Task({
            title,
            description,
            status,
            dueDate
        });

        await task.save();
        res.send("AN INSTANCE OF Task MODEL AKA task WERE ADD");
    } catch (err) {
        res.status(400).send("ERROR_OCCURED_IN_STORING : " + err.message);
    }
});

taskRouter.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send("ERROR_OCCURED_IN_FETCHING : " + err.message);
    }
});

taskRouter.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            throw new Error("TASK_NOT_FOUND");
        }

        res.json(task);
    } catch (err) {
        res.status(404).send("ERROR_OCCURED_IN_FETCHING : " + err.message);
    }
});

taskRouter.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) {
            throw new Error("TASK_NOT_FOUND");
        }

        res.send("TASK_UPDATED_SUCCESSFULLY");
    } catch (err) {
        res.status(400).send("ERROR_OCCURED_IN_UPDATING : " + err.message);
    }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            throw new Error("TASK_NOT_FOUND");
        }

        res.send("TASK_DELETED_SUCCESSFULLY");
    } catch (err) {
        res.status(400).send("ERROR_OCCURED_IN_DELETION : " + err.message);
    }
});

module.exports = {
    taskRouter
};





