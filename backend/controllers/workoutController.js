const workoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// routes or API endpoints (the handlers)
// get /workouts = gets all the workout documents
const getWorkouts = async (req, res) => {
  const workouts = await workoutModel.find({}).sort({ createAt: -1 });
  res.status(200).json(workouts);
};

// get /workout/:id = gets a single workout document
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout!" });
  }
  const workout = await workoutModel.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout!" });
  }
  res.status(200).json(workout);
};

// post /workouts = creates a new workout document
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // adds a workout document in the database
  try {
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete /workout/:id = deletes a single workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout!" });
  }
  const workout = await workoutModel.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout!" });
  }
  res.status(200).json(workout);
};

// patch /workout/:id = deletes a single workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout!" });
  }
  const workout = await workoutModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(404).json({ error: "No such workout!" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
