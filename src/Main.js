import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Grid from "./Grid.js";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      roomID: "",
      units: Array(8)
        .fill()
        .map(() => Array(8).fill(null)),
      highlighted: Array(8)
        .fill()
        .map(() => Array(8).fill(false)),
      currTurn: "W",
      ownColor: "",
      boxSelected: [] // Basically a Queue to keep track of previous 2 boxes clicked.
    };
  }
  async componentDidMount() {
    const roomID = this.props.match.params.id;
    this.setState({ roomID });

    const password = prompt("Enter the password to join this room");
    const confirmation = await axios.post("/joinroom", {
      password,
      roomID,
      name: this.props.name
    });
    if (!confirmation.data.canJoin || password == null)
      document.location.href = "/";
    else {
      const { color } = confirmation.data;
      this.setState({ ownColor: color });
      this.props.socket.emit("joiningRoom", { roomID });
    }

    this.registerSocketListeners();
    this.newGame();
  }

  registerSocketListeners = () => {
    this.props.socket.on("state", data => {
      this.setState({ units: data.units, currTurn: data.currTurn });
      this.unHighlightAll();
    });
    this.props.socket.on("gameOver", data => {
      const { won } = data;
      if (won == this.state.ownColor) {
        alert("You win :)");
      } else {
        alert("You lose :(");
      }
      document.location.href = "/";
    });
    this.props.socket.on("exit", data => {
      if (data.message == "Player disconnected") {
        alert("Apologies. The other player disconnected.");
        document.location.href = "/";
      }
    });
  };

  newGame = () => {
    this.props.socket.emit("getState", { roomID: this.state.roomID });
  };

  unHighlightAllExcept = (i, j) => {
    // All boxes except i,j are unhighlighted
    let newArr = Array(8)
      .fill()
      .map(() => Array(8).fill(false));
    newArr[i][j] = true;
    return newArr;
  };

  unHighlightAll = () => {
    let newArr = Array(8)
      .fill()
      .map(() => Array(8).fill(false));
    this.setState({ highlighted: newArr });
  };

  handleSelect = (i, j) => {
    let highlightedClone = arrayClone(this.state.highlighted);
    let boxSelected = arrayClone(this.state.boxSelected);
    if (boxSelected.length === 0) boxSelected.push([i, j]);
    if (boxSelected.length > 1) boxSelected.shift();
    boxSelected.push([i, j]);
    this.setState({ boxSelected });
    highlightedClone = this.unHighlightAllExcept(i, j);
    // Clicking any other box removes all prior highlighting.
    const unit = this.state.units[i][j].split("_")[1];
    this.setState({ highlighted: highlightedClone, boxSelected: boxSelected });

    switch (unit) {
      case "Pawn":
        this.pawn(i, j, highlightedClone);
        break;
      case "Rook":
        this.rook(i, j, highlightedClone);
        break;
      case "Knight":
        this.knight(i, j, highlightedClone);
        break;
      case "Bishop":
        this.bishop(i, j, highlightedClone);
        break;
      case "Queen":
        this.queen(i, j, highlightedClone);
        break;
      case "King":
        this.king(i, j, highlightedClone);
        break;
    }
  };

  moveUnit = (i, j) => {
    let boxSelected = arrayClone(this.state.boxSelected);
    let unitsClone = arrayClone(this.state.units);

    const prevX = parseInt(boxSelected[1][0]);
    const prevY = parseInt(boxSelected[1][1]);

    // If the box being clicked is the same as the previously clicked one
    if (i === prevX && j === prevY) return;
    if (boxSelected.length > 1) boxSelected.shift();
    boxSelected.push([i, j]);
    const unit = unitsClone[prevX][prevY]; // The box previously clicked
    const unitOnBox = unitsClone[i][j]; // the box clicked (i, j)
    if (unitOnBox !== null) {
      if (unitOnBox.split("_")[1] === "King") {
        this.newGame();
        this.setState({
          highlighted: Array(8)
            .fill()
            .map(() => Array(8).fill(false))
        });
        return;
      }
    }

    let highlightedClone = Array(8)
      .fill()
      .map(() => Array(8).fill(false));

    unitsClone[i][j] = unit;
    unitsClone[prevX][prevY] = null;
    this.setState({
      units: unitsClone,
      boxSelected,
      highlighted: highlightedClone
    });
  };

  pawn = (i, j, highlightedClone) => {
    const unitsClone = arrayClone(this.state.units);
    const turn = this.state.currTurn;
    if (turn === "W") {
      // if turn is white, pawns move above.
      if (unitsClone[i - 1][j] === null) {
        highlightedClone[i - 1][j] = true; //Highlighting the box below the pawn.
        if (i === 6 && unitsClone[i - 2][j] === null)
          highlightedClone[i - 2][j] = true;
      }

      if (j > 0) {
        let left = unitsClone[i - 1][j - 1];
        if (left !== null) {
          let leftUnitColor = left.split("_")[0];
          if (leftUnitColor === "B") highlightedClone[i - 1][j - 1] = true;
        }
      }
      if (j < 7) {
        let right = unitsClone[i - 1][j + 1];
        if (right !== null) {
          let rightUnitColor = right.split("_")[0];
          if (rightUnitColor === "B") highlightedClone[i - 1][j + 1] = true;
        }
      }
    }

    if (turn === "B") {
      // if turn is black, pawns move below.
      if (unitsClone[i + 1][j] === null) {
        highlightedClone[i + 1][j] = true; //Highlighting the box above the pawn.
        if (i === 1 && unitsClone[i + 2][j] === null)
          highlightedClone[i + 2][j] = true;
      }

      if (j > 0) {
        let left = unitsClone[i + 1][j - 1];
        if (left !== null) {
          let leftUnitColor = left.split("_")[0];
          if (leftUnitColor === "W") highlightedClone[i + 1][j - 1] = true;
        }
      }
      if (j < 7) {
        let right = unitsClone[i + 1][j + 1];
        if (right !== null) {
          let rightUnitColor = right.split("_")[0];
          if (rightUnitColor === "W") highlightedClone[i + 1][j + 1] = true;
        }
      }
    }
    this.setState({ highlighted: highlightedClone });
  };

  rook = (i, j, highlightedClone) => {
    const unitsClone = arrayClone(this.state.units);
    const turn = this.state.currTurn;
    if (turn === "W") {
      if (i > 0) {
        for (let r = i - 1; r >= 0; r--) {
          //For boxes above the rook.
          let unit = unitsClone[r][j];
          if (unit === null) highlightedClone[r][j] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              //unit[0] is the color of the unit.
              highlightedClone[r][j] = true;
              break;
            } else break;
          }
        }
      }
      if (i < 7) {
        for (let r = i + 1; r <= 7; r++) {
          //For boxes above the rook.
          let unit = unitsClone[r][j];
          if (unit === null) highlightedClone[r][j] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              //unit[0] is the color of the unit.
              highlightedClone[r][j] = true;
              break;
            } else break;
          }
        }
      }
      if (j > 0) {
        for (let r = j - 1; r >= 0; r--) {
          //For boxes left to the rook.
          let unit = unitsClone[i][r];
          if (unit === null) highlightedClone[i][r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              //unit[0] is the color of the unit.
              highlightedClone[i][r] = true;
              break;
            } else break;
          }
        }
      }
      if (j < 7) {
        for (let r = j + 1; r <= 7; r++) {
          //For boxes right to the rook.
          let unit = unitsClone[i][r];
          if (unit === null) highlightedClone[i][r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              //unit[0] is the color of the unit.
              highlightedClone[i][r] = true;
              break;
            } else break;
          }
        }
      }
    } else {
      if (i > 0) {
        for (let r = i - 1; r >= 0; r--) {
          //For boxes above the rook.
          let unit = unitsClone[r][j];
          if (unit === null) highlightedClone[r][j] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              //unit[0] is the color of the unit.
              highlightedClone[r][j] = true;
              break;
            } else break;
          }
        }
      }
      if (i < 7) {
        for (let r = i + 1; r <= 7; r++) {
          //For boxes above the rook.
          let unit = unitsClone[r][j];
          if (unit === null) highlightedClone[r][j] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              //unit[0] is the color of the unit.
              highlightedClone[r][j] = true;
              break;
            } else break;
          }
        }
      }
      if (j > 0) {
        for (let r = j - 1; r >= 0; r--) {
          //For boxes left to the rook.
          let unit = unitsClone[i][r];
          if (unit === null) highlightedClone[i][r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              //unit[0] is the color of the unit.
              highlightedClone[i][r] = true;
              break;
            } else break;
          }
        }
      }
      if (j < 7) {
        for (let r = j + 1; r <= 7; r++) {
          //For boxes right to the rook.
          let unit = unitsClone[i][r];
          if (unit === null) highlightedClone[i][r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              //unit[0] is the color of the unit.
              highlightedClone[i][r] = true;
              break;
            } else break;
          }
        }
      }
    }
    this.setState({ highlighted: highlightedClone });
  };

  knight = (i, j, highlightedClone) => {
    const unitsClone = arrayClone(this.state.units);
    const turn = this.state.currTurn;
    if (turn === "W") {
      // First of all, ahead.
      if (i >= 2) {
        //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
        // and 1 in the other axis.
        if (j >= 1) {
          let left = unitsClone[i - 2][j - 1];
          if (left === null) highlightedClone[i - 2][j - 1] = true;
          else {
            left = left.split("_");
            if (left[0] === "B") highlightedClone[i - 2][j - 1] = true;
          }
        }
        if (j <= 6) {
          let right = unitsClone[i - 2][j + 1];
          if (right === null) highlightedClone[i - 2][j + 1] = true;
          else {
            right = right.split("_");
            if (right[0] === "B") highlightedClone[i - 2][j + 1] = true;
          }
        }
      }

      if (i <= 5) {
        //i has to be less than 6 if the knight has to move below. because it moves 2 straight
        // and 1 in the other axis.
        if (j >= 1) {
          let left = unitsClone[i + 2][j - 1];
          if (left === null) highlightedClone[i + 2][j - 1] = true;
          else {
            left = left.split("_");
            if (left[0] === "B") highlightedClone[i + 2][j - 1] = true;
          }
        }
        if (j <= 6) {
          let right = unitsClone[i + 2][j + 1];
          if (right === null) highlightedClone[i + 2][j + 1] = true;
          else {
            right = right.split("_");
            if (right[0] === "B") highlightedClone[i + 2][j + 1] = true;
          }
        }
      }

      if (j >= 2) {
        //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
        // and 1 in the other axis.
        if (i >= 1) {
          let left = unitsClone[i - 1][j - 2];
          if (left === null) highlightedClone[i - 1][j - 2] = true;
          else {
            left = left.split("_");
            if (left[0] === "B") highlightedClone[i - 1][j - 2] = true;
          }
        }
        if (i <= 6) {
          let right = unitsClone[i + 1][j - 2];
          if (right === null) highlightedClone[i + 1][j - 2] = true;
          else {
            right = right.split("_");
            if (right[0] === "B") highlightedClone[i + 1][j - 2] = true;
          }
        }
      }

      if (j <= 5) {
        //i has to be less than 6 if the knight has to move below. because it moves 2 straight
        // and 1 in the other axis.
        if (i >= 1) {
          let left = unitsClone[i - 1][j + 2];
          if (left === null) highlightedClone[i - 1][j + 2] = true;
          else {
            left = left.split("_");
            if (left[0] === "B") highlightedClone[i - 1][j + 2] = true;
          }
        }
        if (i <= 6) {
          let right = unitsClone[i + 1][j + 2];
          if (right === null) highlightedClone[i + 1][j + 2] = true;
          else {
            right = right.split("_");
            if (right[0] === "B") highlightedClone[i + 1][j + 2] = true;
          }
        }
      }
    } else {
      // First of all, ahead.
      if (i >= 2) {
        //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
        // and 1 in the other axis.
        if (j >= 1) {
          let left = unitsClone[i - 2][j - 1];
          if (left === null) highlightedClone[i - 2][j - 1] = true;
          else {
            left = left.split("_");
            if (left[0] === "W") highlightedClone[i - 2][j - 1] = true;
          }
        }
        if (j <= 6) {
          let right = unitsClone[i - 2][j + 1];
          if (right === null) highlightedClone[i - 2][j + 1] = true;
          else {
            right = right.split("_");
            if (right[0] === "W") highlightedClone[i - 2][j + 1] = true;
          }
        }
      }

      if (i <= 5) {
        //i has to be less than 6 if the knight has to move below. because it moves 2 straight
        // and 1 in the other axis.
        if (j >= 1) {
          let left = unitsClone[i + 2][j - 1];
          if (left === null) highlightedClone[i + 2][j - 1] = true;
          else {
            left = left.split("_");
            if (left[0] === "W") highlightedClone[i + 2][j - 1] = true;
          }
        }
        if (j <= 6) {
          let right = unitsClone[i + 2][j + 1];
          if (right === null) highlightedClone[i + 2][j + 1] = true;
          else {
            right = right.split("_");
            if (right[0] === "W") highlightedClone[i + 2][j + 1] = true;
          }
        }
      }

      if (j >= 2) {
        //i has to be greater than 1 if the knight has to move ahead. because it moves 2 straight
        // and 1 in the other axis.
        if (i >= 1) {
          let left = unitsClone[i - 1][j - 2];
          if (left === null) highlightedClone[i - 1][j - 2] = true;
          else {
            left = left.split("_");
            if (left[0] === "W") highlightedClone[i - 1][j - 2] = true;
          }
        }
        if (j <= 6) {
          let right = unitsClone[i + 1][j - 2];
          if (right === null) highlightedClone[i + 1][j - 2] = true;
          else {
            right = right.split("_");
            if (right[0] === "W") highlightedClone[i + 1][j - 2] = true;
          }
        }
      }

      if (j <= 5) {
        //i has to be less than 6 if the knight has to move below. because it moves 2 straight
        // and 1 in the other axis.
        if (i >= 1) {
          let left = unitsClone[i - 1][j + 2];
          if (left === null) highlightedClone[i - 1][j + 2] = true;
          else {
            left = left.split("_");
            if (left[0] === "W") highlightedClone[i - 1][j + 2] = true;
          }
        }
        if (i <= 6) {
          let right = unitsClone[i + 1][j + 2];
          if (right === null) highlightedClone[i + 1][j + 2] = true;
          else {
            right = right.split("_");
            if (right[0] === "W") highlightedClone[i + 1][j + 2] = true;
          }
        }
      }
    }
  };

  bishop = (i, j, highlightedClone) => {
    //bishop can move in 4 directions.
    const unitsClone = arrayClone(this.state.units);
    const turn = this.state.currTurn;
    if (turn === "W") {
      for (let r = 1; r < 8; r++) {
        // right top.
        if (i - r >= 0 && j + r <= 7) {
          let unit = unitsClone[i - r][j + r];
          if (unit === null) highlightedClone[i - r][j + r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              highlightedClone[i - r][j + r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // right bottom.
        if (i + r <= 7 && j + r <= 7) {
          let unit = unitsClone[i + r][j + r];
          if (unit === null) highlightedClone[i + r][j + r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              highlightedClone[i + r][j + r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // left bottom.
        if (i + r <= 7 && j - r >= 0) {
          let unit = unitsClone[i + r][j - r];
          if (unit === null) highlightedClone[i + r][j - r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              highlightedClone[i + r][j - r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // left top.
        if (i - r >= 0 && j - r >= 0) {
          let unit = unitsClone[i - r][j - r];
          if (unit === null) highlightedClone[i - r][j - r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") {
              highlightedClone[i - r][j - r] = true;
              break;
            } else break;
          }
        }
      }
    } else {
      for (let r = 1; r < 8; r++) {
        // right top.
        if (i - r >= 0 && j + r <= 7) {
          let unit = unitsClone[i - r][j + r];
          if (unit === null) highlightedClone[i - r][j + r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              highlightedClone[i - r][j + r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // right bottom.
        if (i + r <= 7 && j + r <= 7) {
          let unit = unitsClone[i + r][j + r];
          if (unit === null) highlightedClone[i + r][j + r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              highlightedClone[i + r][j + r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // left bottom.
        if (i + r <= 7 && j - r >= 0) {
          let unit = unitsClone[i + r][j - r];
          if (unit === null) highlightedClone[i + r][j - r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              highlightedClone[i + r][j - r] = true;
              break;
            } else break;
          }
        }
      }

      for (let r = 1; r < 8; r++) {
        // left top.
        if (i - r >= 0 && j - r >= 0) {
          let unit = unitsClone[i - r][j - r];
          if (unit === null) highlightedClone[i - r][j - r] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") {
              highlightedClone[i - r][j - r] = true;
              break;
            } else break;
          }
        }
      }
    }

    this.setState({ highlighted: highlightedClone });
  };

  king = (i, j, highlightedClone) => {
    const unitsClone = arrayClone(this.state.units);
    const turn = this.state.currTurn;
    if (turn === "W") {
      if (i >= 1) {
        let unit = unitsClone[i - 1][j];
        console.log(unit);
        if (unit === null) highlightedClone[i - 1][j] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "B") highlightedClone[i - 1][j] = true;
        }

        if (j >= 1) {
          let unit = unitsClone[i - 1][j - 1];
          if (unit === null) highlightedClone[i - 1][j - 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") highlightedClone[i - 1][j - 1] = true;
          }
        }
        if (j <= 6) {
          let unit = unitsClone[i - 1][j + 1];
          if (unit === null) highlightedClone[i - 1][j + 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") highlightedClone[i - 1][j + 1] = true;
          }
        }
      }

      if (i <= 6) {
        let unit = unitsClone[i + 1][j];
        console.log(unit);
        if (unit === null) highlightedClone[i + 1][j] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "B") highlightedClone[i + 1][j] = true;
        }

        if (j >= 1) {
          let unit = unitsClone[i + 1][j - 1];
          if (unit === null) highlightedClone[i + 1][j - 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") highlightedClone[i + 1][j - 1] = true;
          }
        }
        if (j <= 6) {
          let unit = unitsClone[i + 1][j + 1];
          if (unit === null) highlightedClone[i + 1][j + 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "B") highlightedClone[i + 1][j + 1] = true;
          }
        }
      }

      if (j >= 1) {
        let unit = unitsClone[i][j - 1];
        if (unit === null) highlightedClone[i][j - 1] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "B") highlightedClone[i][j - 1] = true;
        }
      }

      if (j <= 6) {
        let unit = unitsClone[i][j + 1];
        if (unit === null) highlightedClone[i][j + 1] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "B") highlightedClone[i][j + 1] = true;
        }
      }
    } else {
      if (i >= 1) {
        let unit = unitsClone[i - 1][j];
        console.log(unit);
        if (unit === null) highlightedClone[i - 1][j] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "W") highlightedClone[i - 1][j] = true;
        }

        if (j >= 1) {
          let unit = unitsClone[i - 1][j - 1];
          if (unit === null) highlightedClone[i - 1][j - 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") highlightedClone[i - 1][j - 1] = true;
          }
        }
        if (j <= 6) {
          let unit = unitsClone[i - 1][j + 1];
          if (unit === null) highlightedClone[i - 1][j + 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") highlightedClone[i - 1][j + 1] = true;
          }
        }
      }

      if (i <= 6) {
        let unit = unitsClone[i + 1][j];
        console.log(unit);
        if (unit === null) highlightedClone[i + 1][j] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "W") highlightedClone[i + 1][j] = true;
        }

        if (j >= 1) {
          let unit = unitsClone[i + 1][j - 1];
          if (unit === null) highlightedClone[i + 1][j - 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") highlightedClone[i + 1][j - 1] = true;
          }
        }
        if (j <= 6) {
          let unit = unitsClone[i + 1][j + 1];
          if (unit === null) highlightedClone[i + 1][j + 1] = true;
          else {
            unit = unit.split("_");
            if (unit[0] === "W") highlightedClone[i + 1][j + 1] = true;
          }
        }
      }

      if (j >= 1) {
        let unit = unitsClone[i][j - 1];
        if (unit === null) highlightedClone[i][j - 1] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "W") highlightedClone[i][j - 1] = true;
        }
      }

      if (j <= 6) {
        let unit = unitsClone[i][j + 1];
        if (unit === null) highlightedClone[i][j + 1] = true;
        else {
          unit = unit.split("_");
          if (unit[0] === "W") highlightedClone[i][j + 1] = true;
        }
      }
    }
  };

  queen = (i, j, highlightedClone) => {
    this.rook(i, j, highlightedClone);
    this.bishop(i, j, highlightedClone);
  };

  render() {
    return (
      <Grid
        units={this.state.units}
        currTurn={this.state.currTurn}
        key="Grid"
        handleSelect={this.handleSelect}
        highlighted={this.state.highlighted}
        moveUnit={this.moveUnit}
        ownColor={this.state.ownColor}
        boxSelected={this.state.boxSelected}
        socket={this.props.socket}
        roomID={this.state.roomID}
      />
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default withRouter(Main);
