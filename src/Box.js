import React, { Component } from "react";

class Box extends Component {
  handleClick = () => {
    const currTurn = this.props.currTurn;
    const { ownColor } = this.props;
    if (currTurn != this.props.ownColor) return;

    const id = this.props.boxId.split("");
    const i = parseInt(id[0]);
    const j = parseInt(id[1]);
    const unitAtPosition = this.props.units[i][j];
    const isHighlighted = this.props.highlighted;

    const boxSelected = this.props.boxSelected;

    // If the box recently selected is a position that a currently selected unit can move to, then move.
    if (isHighlighted[i][j] === true) {
      // this.props.moveUnit(i, j);
      this.props.socket.emit("move", {
        prevX: boxSelected[1][0],
        prevY: boxSelected[1][1],
        x: i,
        y: j,
        roomID: this.props.roomID
      });
    } else if (
      unitAtPosition !== null && // If a unit is present at the selected position
      unitAtPosition.split("_")[0] == ownColor // If the color of the unit selected is the same of the player
    )
      this.props.handleSelect(i, j);
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
