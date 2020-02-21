import React, { Component } from "react";
import Box from "./Box.js";

class Grid extends Component {
  render() {
    const turn = this.props.currTurn;
    let classes = "grid ";
    classes += turn;
    let boxArr = [];
    for (let i = 0; i < 8; i++) {
      boxArr.push([]);
      for (let j = 0; j < 8; j++) {
        let boxId = i + "" + j;
        boxArr[i].push(
          <Box
            units={this.props.units}
            currTurn={this.props.currTurn}
            key={boxId}
            boxId={boxId}
            handleSelect={this.props.handleSelect}
            highlighted={this.props.highlighted}
            moveUnit={this.props.moveUnit}
            ownColor={this.props.ownColor}
            boxSelected={this.props.boxSelected}
            socket={this.props.socket}
            roomID={this.props.roomID}
          />
        );
      }
    }
    return (
      <div className={classes} style={{ width: 720 }}>
        {boxArr}
      </div>
    );
  }
}

export default Grid;
