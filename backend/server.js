require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes or API endpoints (the handlers)
app.use("/api/workouts", workoutRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening on PORT " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});
