import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyField] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, reps, load };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyField([]);
      console.log("New workout added!", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout!</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Reps: </label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <label>Load (kg): </label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
