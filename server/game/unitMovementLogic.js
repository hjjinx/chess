module.exports.pawn = (i, j, canMoveTo, currBoard, turn) => {
  if (turn === "W") {
    // if turn is white, pawns move above.
    if (currBoard[i - 1][j] === null) {
      canMoveTo[i - 1][j] = true; //Highlighting the box below the pawn.
      if (i === 6 && currBoard[i - 2][j] === null) canMoveTo[i - 2][j] = true;
    }

    if (j > 0) {
      let left = currBoard[i - 1][j - 1];
      if (left !== null) {
        let leftUnitColor = left.split("_")[0];
        if (leftUnitColor === "B") canMoveTo[i - 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = currBoard[i - 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.split("_")[0];
        if (rightUnitColor === "B") canMoveTo[i - 1][j + 1] = true;
      }
    }
  }

  if (turn === "B") {
    // if turn is black, pawns move below.
    if (currBoard[i + 1][j] === null) {
      canMoveTo[i + 1][j] = true; //Highlighting the box above the pawn.
      if (i === 1 && currBoard[i + 2][j] === null) canMoveTo[i + 2][j] = true;
    }

    if (j > 0) {
      let left = currBoard[i + 1][j - 1];
      if (left !== null) {
        let leftUnitColor = left.split("_")[0];
        if (leftUnitColor === "W") canMoveTo[i + 1][j - 1] = true;
      }
    }
    if (j < 7) {
      let right = currBoard[i + 1][j + 1];
      if (right !== null) {
        let rightUnitColor = right.split("_")[0];
        if (rightUnitColor === "W") canMoveTo[i + 1][j + 1] = true;
      }
    }
  }
  return canMoveTo;
};

module.exports.rook = (i, j, highlightedClone) => {
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

module.exports.knight = (i, j, highlightedClone) => {
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

module.exports.bishop = (i, j, highlightedClone) => {
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

module.exports.king = (i, j, highlightedClone) => {
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

module.exports.queen = (i, j, highlightedClone) => {
  this.rook(i, j, highlightedClone);
  this.bishop(i, j, highlightedClone);
};
