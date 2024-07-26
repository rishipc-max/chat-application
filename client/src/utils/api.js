import axios from "axios";

const serverAPI = 'https://chat-application-z235.onrender.com/api';

export const getRoomExists = async (roomId) => {
  const response =  await axios.get(`${serverAPI}/room-exists/${roomId}`);
  return response.data;
}