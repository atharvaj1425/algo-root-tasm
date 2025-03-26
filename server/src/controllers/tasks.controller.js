import { Task } from "../models/tasks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET /tasks: Retrieve all tasks
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// POST /tasks: Create a new task
export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            throw new ApiError(400, "Title is required");
        }

        const task = await Task.create({
            title,
            description,
            owner: req.user._id,
        });

        res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
    } catch (error) {
        next(error);
    }
};

// PUT /tasks/:id: Update an existing task
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Force `completeStatus` to true
        const updates = { ...req.body, completeStatus: true };

        const task = await Task.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        res.status(200).json(new ApiResponse(200, task, "Task marked as completed"));
    } catch (error) {
        next(error);
    }
};


// DELETE /tasks/:id: Remove a task
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
    } catch (error) {
        next(error);
    }
};