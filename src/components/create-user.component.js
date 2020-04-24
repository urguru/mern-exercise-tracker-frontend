import React, { Component } from "react";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const user = { username: this.state.username };
    try {
      const {data} = await axios.post(`${url}/users/add`, user);
      this.setState({
        username: "",
      });
      alert(data.res)
    } catch (e) {
        alert(e)}
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form action="" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="">Username: </label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.onChangeUserName}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create New User"
              className="btn btn-primary"
              onClick={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}
