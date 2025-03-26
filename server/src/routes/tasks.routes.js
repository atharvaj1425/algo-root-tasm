import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Task } from "../models/tasks.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = express.Router();

// Protect all task routes with the verifyToken middleware
router.use(verifyToken);

import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/tasks.controller.js";

router.get("/get-tasks", verifyToken, getAllTasks); // Retrieve all tasks
router.post("/add-tasks", verifyToken, createTask); // Create a new task
router.put("/:id", verifyToken, updateTask); // Update an existing task
router.delete("/:id", verifyToken, deleteTask); // Remove a task

export default router;