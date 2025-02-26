
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 100,
        },
        description: {
            type: String,
            trim: true,
            maxLength: 500,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true, 
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = {
    Task,
};

