const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const bodyParser = require("body-parser");

const gameFunctions = require("./game/game.js");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

var state = {
  1: { currBoard: [], canMoveTo: [], currTurn: "W", players: 0, password: "" }
};

var globalSocket;

io.on("connection", socket => {
  globalSocket = socket;
});

// globalSocket.on("");

app.get("/", (req, res) => {
  res.json(state);
});

app.post("/newgame", (req, res) => {
  const { body } = req;
  const { password } = body;
  let subURL = "";

  //checking if the created subURL is already in use
  while (state[subURL] != undefined || subURL == "") {
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
    subURL = "";
    for (let i = 0; i < 6; i++) subURL += arr[Math.floor(Math.random() * 36)];
  }

  globalSocket.join(subURL);

  state[subURL] = {};
  state[subURL].players = 0;
  state[subURL].password = password;

  const unitsArr = gameFunctions.newGame();
  state[subURL].currBoard = unitsArr;
  state[subURL].canMoveTo = Array(8)
    .fill()
    .map(() => Array(8).fill(null));

  res.json({ subURL, ...state[subURL] });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
