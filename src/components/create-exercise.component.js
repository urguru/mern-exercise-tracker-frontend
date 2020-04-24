import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useParams} from 'react-router-dom'
import axios from "axios";
const url=process.env.REACT_APP_SERVER_URL
export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      owner:"",
      desc: "",
      duration: "",
      date: new Date(),
      users: [],
    };

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    axios
      .get(`${url}/users`)
      .then((res) => {
        this.setState({ users: res.data,username:res.data[0].username,owner:res.data[0]._id })
        if(res.data.length===0)
        {
          alert("Create an user first to create exercise data")
          window.location='/user'
        }
      })
      .catch((e)=>(console.log(e))) 
  }

  onChangeUserName(e) {
    const selector=e.target
    console.log(e.target.value)
    console.log(selector[selector.selectedIndex].id);
    this.setState({
      username: e.target.value,
      owner:selector[selector.selectedIndex].id
    });
    console.log(url);
  }
  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    });
    console.log(url);
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
    e.preventDefault();
    const {username,owner,desc,date,duration}=this.state
    const exercise ={username,owner,desc,date,duration};
    console.log(exercise)
    axios.post(`${url}/exercises/add`,exercise)
    .then((res)=>(console.log(res)))
    .catch((error)=>(console.log(error)))
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="">Username: </label>
            <select
              ref="userInput"
              selected
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
              name=""
              id=""
            >
              {this.state.users.map((user) => (
                <option key={user._id} id={user._id} value={user.username}>
                  {user.username}
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
