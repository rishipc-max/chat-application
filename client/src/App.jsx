import { Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Join from "./pages/Join";
import Room from "./pages/Room";
import "./App.css";
import ThemeProvider from "./theme";
import { useEffect } from "react";
import { connectWithSocketIOServer } from "./utils/wss";

function App() {
   useEffect(() => {
     connectWithSocketIOServer();
   }, []);
  return (
    <>
    <ThemeProvider>
     <Routes>
       <Route path="/" index element={<Intro />}></Route>
       <Route path="/join-room" element={<Join />}></Route>
       <Route path="/room" element={<Room />}></Route>
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
