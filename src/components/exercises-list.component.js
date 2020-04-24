import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;
const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.desc}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [],
    };
  }
  deleteExercise(id) {
    axios.delete(`${url}/exercises/${id}`).then((res) => {
      const index = this.state.exercises.findIndex(
        (exercise) => exercise._id === id
      );
      const tempExercises = [...this.state.exercises];
      tempExercises.splice(index, 1);
      this.setState({
        exercises: tempExercises,
      });
    });
  }

  exerciseList(){
      return this.state.exercises.map(currentExercise=>{
          return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}></Exercise>
      })
  }

  componentDidMount() {
    axios
      .get(`${url}/exercises`)
      .then((response) => {
          console.log(response.data)
        this.setState({
          exercises: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
