import React, { Component } from "react";

class Box extends Component {
  handleClick = () => {
    const currTurn = this.props.currTurn;
    const id = this.props.boxId.split("");
    const i = parseInt(id[0]);
    const j = parseInt(id[1]);
    const value = this.props.units[i][j];
    const highlighted = this.props.highlighted;
    if (highlighted[i][j] === true) {
      this.props.moveUnit(i, j);
    } else if (value !== null) {
      const color = this.props.units[i][j].split("_")[0];
      if (currTurn === color) {
        this.props.handleSelect(i, j);
      }
    }
  };

  render() {
    let classes = "box"; // Adding the name of the unit to the classes.
    //Alternating black and white boxes
    const boxId = this.props.boxId.split("");
    const i = parseInt(boxId[0]);
    const j = parseInt(boxId[1]);
    if ((i + j) % 2 === 0) {
      classes += " white";
    } else classes += " black";
    // Alternating boxes ends here.

    const value = this.props.units[i][j];
    if (value !== null) {
      var color = value.split("_")[0]; //Color can be "B" or "W".
      classes += " " + color;
      const unit = value.split("_")[1]; // unit is Bishop or Pawn or Queen..
      classes += " " + unit;
    }

    if (this.props.highlighted[i][j]) {
      // Checking if the box to be highlighted is friend or foe.
      const currTurn = this.props.currTurn;
      if (color === "W" && currTurn === "B") classes += " highlightedKill";
      else if (color === "B" && currTurn === "W") classes += " highlightedKill";
      else classes += " highlighted";
      // If current turn matches the color of unit, it is friend.
    }
    return <div className={classes} onClick={this.handleClick} />;
  }
}

export default Box;
