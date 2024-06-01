import { SetOverlay } from "../redux/slices/app";
import { store } from "../redux/store";
import * as wss from "./wss";
import Peer from "simple-peer";

import global from "global";
import * as process from "process";
global.process = process;

const constraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

let localStream;

// Here we called the getUserMedia method on the navigator.mediaDevices object to access the user's media devices (camera and microphone).
// The constraints variable specifies what type of media we want to access - audio and video.
// The code then uses a promise which resolves with a stream object if successful or rejects with an error message if not successful.

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(SetOverlay(false));
      localStream = stream; // it assigns the localStream variable to hold the stream object returned by getUserMedia(). This will be used later for showing local video preview.
      showLocalVideoPreview(localStream);
      // Then depending on whether isRoomHost parameter is true or false, either wss.createNewRoom() or wss.joinRoom() methods are called respectively.
      // These methods handle creating/joining rooms for video conferencing using WebSockets protocol.
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity);
    })
    .catch((err) => {
      console.log("error occured when access to local stream");
      console.log(err);
    });

};

let peers = {};
let streams = [];
// peers {
//  socket.id: {

//  }
//}

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.1.google.com:19302",
      },
    ],
  };
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data, // webRTC offer, webRTC Answer, ice candidates.
      connUserSocketId: connUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream coming from other peer");
    
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  // add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};


// ?? UI

const showLocalVideoPreview = (stream) => {
  //show local video preview
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  //TODO displaying incomming stream from other peers on screen
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

// In summary, this code uses WebRTC API (getUserMedia) and WebSockets protocol (wss) to enable real-time communication between users through audio/video streaming.
// It also utilizes Redux store for managing application state.
// The code imports two modules, sets constraints for audio and video, and defines a function that gets the local preview of the user's camera and initializes a room connection.
// It then checks if the user is the host of the room or not, and either creates a new room or joins an existing one.
// If successful, it shows the local video preview.
