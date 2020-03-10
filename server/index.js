const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);
const bodyParser = require("body-parser");

const gameFunctions = require("./game/game.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var state = {
  /** This is the structure of a room being stored in this state
   * 1: {
    currBoard: [],
    canMoveTo: [],
    currTurn: "W",
    players: 0,
    password: "",
    player1: { name: "", id: "" },
    player2: { name: "", id: "" },
    description: ""
  }
   */
};

var globalSocket;

emitListOfRooms = socket => {
  let toSend = [];
  let i = 0;
  for (room in state) {
    toSend[i] = {};
    toSend[i].players = state[room].players;
    toSend[i].description = state[room].description;
    toSend[i].roomId = room;
    if (state[room].password == "" || state[room].password == null)
      toSend[i].passwordProtected = false;
    else toSend[i].passwordProtected = true;
    i++;
  }
  socket.emit("listOfRooms", toSend);
};

io.on("connection", socket => {
  globalSocket = socket;
  emitListOfRooms(socket);
  var interval = setInterval(() => {
    emitListOfRooms(socket);
  }, 2000);

  socket.on("joiningRoom", data => {
    console.log(socket.id + " joined room " + data.roomID);
    socket.join(data.roomID);
  });
  socket.on("getState", data => {
    const { roomID } = data;
    const currState = state[roomID];
    io.to(roomID).emit("state", {
      units: currState.currBoard,
      currTurn: currState.currTurn
    });
  });
  socket.on("move", data => {
    // The client sends the coordinates of the last two boxes he clicked.

    const { prevX, prevY, x, y, roomID } = data;
    const currState = state[roomID];
    const movingFrom = currState.currBoard[prevX][prevY];
    const movingTo = currState.currBoard[x][y];

    const arr = gameFunctions.checkMovementFrom(
      prevX,
      prevY,
      currState.currBoard,
      currState.currTurn
    );
    if (arr[x][y] == true) {
      if (
        currState.currBoard[x][y] &&
        currState.currBoard[x][y].split("_")[1] == "King"
      ) {
        io.to(roomID).emit("gameOver", { won: currState.currTurn });
        state[roomID] = undefined;
        return;
      }
      currState.currBoard[x][y] = movingFrom;
      currState.currBoard[prevX][prevY] = null;
      currState.currTurn = currState.currTurn == "W" ? "B" : "W";

      io.to(roomID).emit("state", {
        units: currState.currBoard,
        currTurn: currState.currTurn
      });
    }

    // const state = state[roomID];
    // if (state[roomID].currBoard)
  });

  socket.on("disconnecting", () => {
    clearInterval(interval);
    const keys = Object.keys(socket.rooms);
    let roomId;
    if (keys.length > 1) {
      if (socket.rooms[keys[0]] == keys[0]) {
        roomId = keys[1];
      } else {
        roomId = keys[0];
      }
      io.to(roomId).emit("exit", { message: "Player disconnected" });
      delete state[roomId];
    }
  });
});

app.get("/all", (req, res) => {
  res.json(state);
});

app.post("/joinroom", (req, res) => {
  const data = req.body;
  console.log(data);
  globalSocket.join(data.roomID);
  if (
    data.password == state[data.roomID].password &&
    state[data.roomID].players <= 1
  ) {
    state[data.roomID].players++;
    if (state[data.roomID].players == 1) {
      state[data.roomID].player1 = { name: data.name, color: "W" };
      res.json({ canJoin: true, color: "W" });
    } else if (state[data.roomID].players == 2) {
      // The second person to join the room always gets the Black turn
      state[data.roomID].player2 = { name: data.name, color: "B" };
      res.json({ canJoin: true, color: "B" });
    }
  } else {
    res.json({ canJoin: false, color: "" });
  }
  // console.log(state);
});

app.post("/newgame", (req, res) => {
  const { body } = req;
  let roomID = generateRoomURL();

  state[roomID] = {};
  state[roomID].players = 0;
  state[roomID].description = body.description;
  state[roomID].password = body.password;

  state[roomID].player1 = { color: "W" };
  state[roomID].player2 = { color: "B" };
  state[roomID].currTurn = "W";

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
