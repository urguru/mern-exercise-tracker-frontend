import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;
export default class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      owner: "",
      desc: "",
      duration: "",
      date: new Date(),
    };

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
      const id=this.props.match.params.id
    axios
      .get(`${url}/exercises/${id}`)
      .then((res) => {
        const { username, owner, desc, date, duration } =res.data
        this.setState({
          username,
          owner,
          desc,
          date: new Date(date),
          duration,
        });
      })
      .catch((e) => console.log(e));
  }
  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e) {
    const id = this.props.match.params.id;
    e.preventDefault();
    const { username, owner, desc, date, duration } = this.state;
    const exercise = { username, owner, desc, date, duration };
    console.log(exercise);
    axios
      .patch(`${url}/exercises/${id}`, exercise)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="">Username: </label>
            <select
              ref="userInput"
              selected
              className="form-control"
              value={this.state.username}
              name=""
              id=""
            >
                <option>
                  {this.state.username}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Description :</label>
            <input
              type="text"
              required
              value={this.state.desc}
              onChange={this.onChangeDesc}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Duration (in minutes): </label>
            <input
              type="text"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create exercise log"
              className="btn btn-primary"
              onClick={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}
