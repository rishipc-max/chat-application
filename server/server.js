const express = require("express");
const http = require("http");
const {v4: uuid} = require("uuid");
const cors = require("cors");
const twilio = require("twilio");

const PORT = process.env.PORT || 3000;

// create a application using express
const app = express();

// creates a server using the createServer method from http module and passes in the app as its argument
// for listen and respond to http requests.
// This server will be used for socket communication later on.
const server = http.createServer(app);

// The cors middleware is then used to allow cross-origin resource sharing between different domains
app.use(cors());

//connected users array
//maximum users that can join in a meeting is 4
let connectedUsers = [];

//rooms Available array
let rooms = [];

app.get(`/api/room-exists/:roomId`, (req,res) => {
    const {roomId} = req.params; // const roomId(This variable) will hold the roomId that we just fetched from webUrl using app.get
    
    const room = rooms.find((room) => room.id === roomId); //finds a room that matches the roomid

    if(room) {
    // send res that room exists.
        if (connectedUsers.length > 3) {
            //send res that room is exists but it is full.
            return res.status(200).json({
                roomExists: true,
                full: true,
            })
        } else {
            return res.status(200).json({
                roomExists: true,
                full: false,
            })
        }
    } else {
    // send res that room does not exists.
    return res.status(200).json({
        roomExists: false,
    })
    }
})


// An instance of socket.io is created with the server we just created as its first argument and an object containing options as its second argument.
// The options specify that any origin can access this socket connection (using wildcard *) and only GET and POST methods are allowed.
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ['GET','POST']
    }
});

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on('create-new-room', (data) => {
        createNewRoomHandler(data, socket);
    });

    socket.on('join-room', (data) => {
        joinRoomHandler(data, socket);
    });

    socket.on('disconnect', () => {
        disconnectHandler(socket);
    });

    socket.on('conn-signal', (data) => {
        signalingHandler(data, socket);
    });

    socket.on('conn-init', (data) => {
        initializeConnectionHandler(data, socket);
    });

});

// sockect.io handlers

const createNewRoomHandler = (data, socket) => {
    console.log("user is like to host a new room");
    console.log(data);

    const {identity} = data;
    const roomId = uuid();

    //create new user
    const newUser = {
        identity,
        id: uuid(),
        socketId: socket.id,
        roomId,
    }

    // push that user to connectedUsers array
    connectedUsers = [...connectedUsers, newUser];

    //create new room
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser],
    }
     
    //join socket.io room
    socket.join(roomId);

    rooms = [...rooms, newRoom];

    // emit an event back to client who created this room  => roomId
    socket.emit("room-id", {roomId});
    
    // emit an event with all users who are connected to this room 
    socket.emit("room-update", {connectedUsers: newRoom.connectedUsers});
}

const joinRoomHandler = (data, socket) => {
    const {identity, roomId} = data;

    const newUser = {
        identity,
        id: uuid(),
        socketId: socket.id,
        roomId,
    }
    
    const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

    socket.join(roomId);

    connectedUsers = [...connectedUsers, newUser];

    // emit to all users which are already in this room to prepare for the webRTC peer connection.
    room.connectedUsers.forEach((user) => {
        if(user.socketId !== socket.id){
            const data = {
                connUserSocketId: socket.id,
            };

            io.to(user.socketId).emit("conn-prepare", data);
        }
    });

    io.to(roomId).emit("room-update", {connectedUsers: room.connectedUsers});

};

const disconnectHandler = (socket) => {
    // find if user was registered - if yes remove him from connectedusers and room
    const user = connectedUsers.find((user) => user.socketId === socket.id);

    if(user) {
        //remove user from room
        const room = rooms.find((room) => room.id === user.roomId);

        room.connectedUsers = room.connectedUsers.filter((user) => user.socketId !== socket.id);

        // leave socket.io room
        socket.leave(user.roomId);


        // close the room if amount of users staying in room becomes zero.
        if(room.connectedUsers.length > 0) {

            io.to(room.id).emit("user-disconnected", {
                socketId: socket.id,
            } );

            // emit an event to the rest of users in room => new list of connectedusers
            io.to(room.id).emit('room-update', {
            connectedUsers: room.connectedUsers,
            });
        }  else {
            rooms = rooms.filter((r) => r.id !== room.id);
        }
    }
}

const signalingHandler = (data, socket) => {
    const {connUserSocketId, signal} = data;

    const signalingData = {signal, connUserSocketId: socket.id}

    io.to(connUserSocketId).emit("conn-signal", signalingData);
};

// information from clients which are already in room that they have prepared from incomming connections.
const initializeConnectionHandler = (data, socket) => {
    const {connUserSocketId} = data;

    const initData = {connUserSocketId: socket.id}

    io.to(connUserSocketId).emit("conn-init", initData);
};

server.listen(PORT,()=> {
    console.log(`server is running on ${PORT}`)
});

// Overall, this code demonstrates how to use Node.js along with Express framework to create a web application capable of real-time communication through sockets using Socket.IO library.
// The code attempts to create a server using Express and Socket.io, with the ability to send and receive data through HTTP requests and use Twilio for communication.