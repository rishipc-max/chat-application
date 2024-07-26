// The code is using the createSlice function from Redux Toolkit to create a slice of state called "app".
// This slice contains four pieces of state: themeMode, identity, roomId, and isRoomHost.
// The initialState object sets the initial values for these pieces of state.

// The updateIsRoomHost reducer function takes in two parameters - state and action.
// It updates the value of isRoomHost in the app slice with the payload (value) passed in through dispatch.
// Similarly, updateIdentity and updateRoomId reducers take in two parameters - state and action.
// They both update their respective piece of state with the payload (value) passed in through dispatch.

// The code then exports these reducers and also includes functions to dispatch these actions asynchronously.

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  themeMode:  "dark",
  identity: "",
  roomId: "",
  isRoomHost: false,
  connectionOnlyWithAudio: false,
  showOverlay: true,
  participants: [],
  //socketId: null
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateIsRoomHost(state, action) {
      state.isRoomHost = action.payload;
    },
    updateIdentity(state, action){
      state.identity = action.payload;
    },
    updateRoomId(state, action){
      state.roomId = action.payload;
    },
    updateThemeMode(state, action){
      state.themeMode = action.payload;
    },
    updateConnectOnlyWithAudio(state, action){
      state.connectionOnlyWithAudio = action.payload;
    },
    updateOverlay(state, action){
      state.showOverlay = action.payload;
    },
    updateParticipants(state, action){
      state.participants = action.payload;
    },
    filterParticipantsBySocketId(state, action) {
      state.participants = state.participants.filter(participant => participant.socketId !== action.payload);
    },
  }
})

export default slice.reducer;

export const {updateIsRoomHost, updateIdentity, updateRoomId, updateThemeMode, updateConnectOnlyWithAudio, updateOverlay, updateParticipants, filterParticipantsBySocketId} = slice.actions;

export function UpdateIsRoomHost(value){
  return async (dispatch) => {
    dispatch(updateIsRoomHost(value));
  }
}

export function SetIdentity(value){
  return async (dispatch) => {
    dispatch(updateIdentity(value));
  }
}

export function SetRoomId(value){
  return async (dispatch) => {
    dispatch(updateRoomId(value));
  }
}

export function SetTheme(value){
  return async (dispatch) => {
    dispatch(updateThemeMode(value));
  }
}

export function SetConnectOnlyWithAudio(value){
  return async (dispatch) => {
    dispatch(updateConnectOnlyWithAudio(value));
  }
}

export function SetOverlay(value){
  return async (dispatch) => {
    dispatch(updateOverlay(value));
  }
}

export function SetParticipants(participants){
  return async (dispatch) => {
    dispatch(updateParticipants(participants));
  }
}

export function FilterParticipantsBySocketId(socketId) {
  return (dispatch) => {
    dispatch(filterParticipantsBySocketId(socketId));
  }
}

