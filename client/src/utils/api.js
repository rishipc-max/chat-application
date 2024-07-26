import axios from "axios";

const serverAPI = 'http://localhost:3000/api';

export const getRoomExists = async (roomId) => {
  const response =  await axios.get(`${serverAPI}/room-exists/${roomId}`);
  return response.data;
}