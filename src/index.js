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
    description: "",
    rooms: []
  };
  interval = "";
  socket = io("http://localhost:5000");

  componentDidMount() {
    // This is emitted on the server evey 2 seconds.
    // It contains the list of all rooms currently created on the server.
    this.socket.on("listOfRooms", data => {
      this.setState({ rooms: data });
    });
  }

  generateRoom = async () => {
    const res = await axios.post("/newgame", {
      description: this.state.description,
      password: this.state.password
    });
    const { roomID } = res.data;

    document.location.href = `/game/${roomID}`;
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  joinRoom = room => {
    console.log(this.state);
    document.location.href = `/game/${room.roomId}`;
  };

  render() {
    var tableList = [];
    for (let i = 0; i < this.state.rooms.length; i++) {
      const room = this.state.rooms[i];
      tableList.push(
        <tr>
          <td>{room.players}</td>
          <td>{room.description}</td>
          <td>{room.passwordProtected ? "Yes" : "No"}</td>
          <td>
            {room.players < 2 ? (
              <button onClick={() => this.joinRoom(room)}>
                {" "}
                {room.roomId}
              </button>
            ) : (
              "Can't. Room Full"
            )}
          </td>
        </tr>
      );
    }
    return (
      <Router>
        <Route exact path="/">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <div>
              <h1 style={{ color: "white" }}>CHESS</h1>
            </div>
            <div>
              <label style={{ color: "white", margin: "10px" }}>
                Room Description
              </label>
              <input
                type="text"
                style={{ margin: "10px" }}
                onChange={e => {
                  this.setState({ description: e.target.value });
                }}
                name="description"
                value={this.state.description}
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
          <div
            style={{
              color: "white",
              textAlign: "center"
            }}
          >
            <h1>Rooms available:</h1>
            <table align="center" border="1" style={{ width: "50%" }}>
              <tr>
                <th>Players</th>
                <th>Description</th>
                <th>Password?</th>
                <th>Join</th>
              </tr>
              {tableList}
            </table>
          </div>
        </Route>
        <Route path="/game/:id">
          <Main socket={this.socket} id generateRoom={this.generateRoom} />
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
