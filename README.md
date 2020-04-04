# Multiplayer Chess

## How to run locally?

- Clone the repo
- run `npm i` in the directory to install the client dependencies
- run `npm i` in the ./server directory to install the srever dependencies
- run `node index` in the ./server directory to run the server. The server runs on port 5000.
- run `npm start` in the directory to run the front-end application.
- Browse localhost:3000 to play the game.

## Working

Can be tried here: http://13.233.164.18:3000/
Create a room by entering the description and password then ask your friend (or opponent :p) to browse the same URL that you have and enter the password that you set.

This can be played by 2 people by one creating a room and the other joining it using the URL generated.
The password for the room will be provided by the one that creates the room. The other has to enter the password in order to join the room.
The state of the board for each room is stored on the server. Upon movement, a socket.io event is triggered on the front-end.
This event is handled on the server which authenticates whether the move is valid (hack-proof).
If the move is valid, an event is triggered from the server to both the clients in the room sending the state.
Finally, the state is updated on the front-end.

# PvP-Chess (single player)

Chess with a cool design made using react.js as a fun project.
https://hjjinx.github.io/chess

## How to run?

- Clone the repo
- run `npm i` in the directory to install the dependencies
- run `npm start` to run the application
