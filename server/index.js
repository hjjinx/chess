const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const bodyParser = require("body-parser");

const gameFunctions = require("./game/game.js");

const PORT = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var state = {
  1: {
    currBoard: [],
    canMoveTo: [],
    currTurn: "W",
    players: 0,
    password: "",
    player1: { name: "", id: "" },
    player2: { name: "", id: "" }
  }
};

var globalSocket;

io.on("connection", socket => {
  globalSocket = socket;
  // console.log(socket.client.id);
  // socket.on("newgame", roomID => {});
});

app.get("/all", (req, res) => {
  res.json(state);
});

app.post("/newgame", (req, res) => {
  const { body } = req;
  console.log(req.body);
  let roomID = generateRoomURL();

  globalSocket.join(roomID);

  state[roomID] = {};
  state[roomID].players = 0;
  state[roomID].password = body.password;
  console.log(`password: ${state[roomID].password}`);

  state[roomID].player1 = { name: body.name, id: globalSocket.client.id };
  state[roomID].player2 = { name: "", id: "" };

  const unitsArr = gameFunctions.newGame();
  state[roomID].currBoard = unitsArr;
  state[roomID].canMoveTo = Array(8)
    .fill()
    .map(() => Array(8).fill(null));

  res.json({ roomID });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

function generateRoomURL() {
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
  return subURL;
}
