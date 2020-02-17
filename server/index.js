const express = require("express");
const app = express();
const server = require(http).Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const PORT = 5000;

var state = { 1: [] };

app.get("/", (req, res) => {
  res.json(state);
});

io.on("connection", socket => {
  socket.on("newgame", () => {
    const unitsArr = newGame();
    state[1] = unitsArr;
  });
  socket.on("move", () => {});
});

server.listen(PORT);

const newGame = () => {
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
