const express = require("express");
const router = express.Router();
const workoutModel = require("../models/workoutModel");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// routes or API endpoints (the handlers)
// get /workouts = gets all the workout documents
router.get("/", getWorkouts);

// get /workout/:id = gets a single workout document
router.get("/:id", getWorkout);

// post /workouts = creates a new workout document
router.post("/", createWorkout);

// delete /workout/:id = deletes a single workout
router.delete("/:id", deleteWorkout);

// patch /workout/:id = deletes a single workout
router.patch("/:id", updateWorkout);

module.exports = router;
