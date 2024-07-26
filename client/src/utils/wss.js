import io from "socket.io-client";
import { store } from "../redux/store";
import { SetParticipants, SetRoomId } from "../redux/slices/app";
import * as webRTCHandler from "./webRTCHandler";

const SERVER = "https://chat-application-z235.onrender.com";

let socket = null;

// In order for us to actually connect with our socket.io server, we call the function "connectWithSocketIOServer()".
// Inside this function, we use another function provided by the socket.io-client library called "io()" which takes in our SERVER constant as an argument.
// This creates a connection between our client-side application and our server-side application.
export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("succesfully connected to socket.io server");
    console.log(socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;

    store.dispatch(SetRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(SetParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // inform the other user which just joined the room that we have prepared for incomming connections.
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
};

// Overall, this code demonstrates how sockets work in web development - allowing real-time communication between client and server applications without having to constantly refresh pages or make new requests.
// The code connects to a socket.io server at the specified URL.

export const createNewRoom = (identity) => {
  //emit an event to server we would like to create new room.
  const data = {
    identity,
  };

  socket.emit("create-new-room", data);
};

export const joinRoom = (roomId, identity) => {
  //emit an event to server we would like to join room.
  const data = {
    roomId,
    identity,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
