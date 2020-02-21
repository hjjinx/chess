const unitMovement = require("./unitMovementLogic");

module.exports.newGame = () => {
  let unitsArr = Array(8)
    .fill()
    .map(() => Array(8).fill(null));

  for (let i = 0; i < 8; i++) {
    unitsArr[1][i] = "B_Pawn";
    unitsArr[6][i] = "W_Pawn";
  }

  unitsArr[0][4] = "B_King";
  unitsArr[0][0] = "B_Rook";
  unitsArr[0][7] = "B_Rook";
  unitsArr[0][1] = "B_Knight";
  unitsArr[0][6] = "B_Knight";
  unitsArr[0][2] = "B_Bishop";
  unitsArr[0][5] = "B_Bishop";
  unitsArr[0][3] = "B_Queen";
  unitsArr[7][4] = "W_King";
  unitsArr[7][0] = "W_Rook";
  unitsArr[7][7] = "W_Rook";
  unitsArr[7][1] = "W_Knight";
  unitsArr[7][6] = "W_Knight";
  unitsArr[7][2] = "W_Bishop";
  unitsArr[7][5] = "W_Bishop";
  unitsArr[7][3] = "W_Queen";

  return unitsArr;
};

/**
 * Returns an array containing boolean values which is a copy of the layout
 * of the board denoting the boxes to which the unit can move to
 */
module.exports.checkMovementFrom = (i, j, currBoard, turn) => {
  const unit = currBoard[i][j].split("_")[1];
  let arr;
  const canMoveTo = Array(8)
    .fill()
    .map(() => Array(8).fill(false));
  switch (unit) {
    case "Pawn":
      arr = unitMovement.pawn(i, j, canMoveTo, currBoard, turn);
      break;
    case "Rook":
      arr = unitMovement.rook(i, j, canMoveTo, currBoard, turn);
      break;
    case "Knight":
      arr = unitMovement.knight(i, j, canMoveTo, currBoard, turn);
      break;
    case "Bishop":
      arr = unitMovement.bishop(i, j, canMoveTo, currBoard, turn);
      break;
    case "Queen":
      arr = unitMovement.queen(i, j, canMoveTo, currBoard, turn);
      break;
    case "King":
      arr = unitMovement.king(i, j, canMoveTo, currBoard, turn);
      break;
  }
  return arr;
};
