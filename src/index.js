import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

class Index extends React.Component {
  state = {
    password: ""
  };
  socket = io("http://localhost:5000");

  generateRoom = async () => {
    const res = await axios.post("/newgame", { password: this.state.password });
    console.log(res.data);
    const { subURL } = res.data;

    // this.socket.to(subURL).emit();

    // this.socket.emit("checkURL", subURL);
    // this.socket.on("responseURL", res => {
    //   console.log(res);
    //   if (!res) {
    //     this.generateRoom();
    //     return;
    //   }
    //   document.location.href = `/game/${subURL}`;
    // });
  };
  handleChange = e => this.setState({ password: e.target.value });

  render() {
    return (
      <Router>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ color: "white" }}>CHESS</h1>
          </div>
          <div>
            <label style={{ color: "white", margin: "10px" }}>Password</label>
            <input
              type="text"
              style={{ margin: "10px" }}
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
            ></input>
            <button onClick={this.generateRoom}>Create Room</button>
          </div>
        </div>
        <Switch>
          <Route path="/game/:id">
            <Main socket={this.socket} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
