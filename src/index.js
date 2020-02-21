import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

import Main from "./Main";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

class Index extends React.Component {
  state = {
    password: "",
    name: ""
  };
  socket = io("http://localhost:5000");

  generateRoom = async () => {
    const res = await axios.post("/newgame", {
      name: this.state.name,
      password: this.state.password
    });
    const { roomID } = res.data;

    document.location.href = `/game/${roomID}`;
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Router>
        <Route exact path="/">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <div>
              <h1 style={{ color: "white" }}>CHESS</h1>
            </div>
            <div>
              <label style={{ color: "white", margin: "10px" }}>Name</label>
              <input
                type="text"
                style={{ margin: "10px" }}
                onChange={this.handleChange}
                name="name"
                value={this.state.name}
              ></input>

              <label style={{ color: "white", margin: "10px" }}>Password</label>
              <input
                type="text"
                style={{ margin: "10px" }}
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
              ></input>
              <br></br>
              <button onClick={this.generateRoom}>Create Room</button>
            </div>
          </div>
        </Route>
        <Route path="/game/:id">
          <Main
            socket={this.socket}
            id
            name={this.state.name}
            generateRoom={this.generateRoom}
          />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
