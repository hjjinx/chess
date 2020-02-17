import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

class Index extends React.Component {
  socket = io("http://localhost:5000");
  generateRoom = () => {
    const arr = [
      //   "A",
      //   "B",
      //   "C",
      //   "D",
      //   "E",
      //   "F",
      //   "G",
      //   "H",
      //   "I",
      //   "J",
      //   "K",
      //   "L",
      //   "M",
      //   "N",
      //   "O",
      //   "P",
      //   "Q",
      //   "R",
      //   "S",
      //   "T",
      //   "U",
      //   "V",
      //   "W",
      //   "X",
      //   "Y",
      //   "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ];
    var subURL = "";
    for (let i = 0; i < 6; i++) subURL += arr[Math.floor(Math.random() * 36)];

    this.socket.emit("checkURL", subURL);
    this.socket.on("responseURL", res => {
      console.log(res);
      if (!res) {
        this.generateRoom();
        return;
      }
    });
    document.location.href = `/game/${subURL}`;
  };

  render() {
    return (
      <Router>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <div>
            <h1>CHESS</h1>
          </div>
          <div>
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
