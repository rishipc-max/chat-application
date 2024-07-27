import { Stack } from "@mui/material";
import Label from "../Section/room/Label";
import Participants from "../Section/room/Participants";
import GroupChat from "../Section/room/GroupChat";
import Video from "../Section/room/Video";
import { useEffect } from "react";
import * as webRTCHandler from "../utils/webRTCHandler";
import {useSelector} from "react-redux";
import Overlay from "../Section/room/Overlay";
// import ToggleSwitch from "../components/ToggleTheme";

const Room = () => {

  const {isRoomHost, identity, roomId, showOverlay} = useSelector((state) => state.app);

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId);
  }, []);

  return (
    <Stack 
    direction="row" 
    alignItems="center" 
    sx={{position: "relative",width: 1, height:"calc(100vh)"}}>

    {/* Participants */}
    <Participants />

    {/* Video Section */}
    <Video />

    {/* Group Chat Section */}
    <GroupChat />

    {/* Label (Showcasing ID)*/}
    <Label />
    {/* <ToggleSwitch /> */}
    { showOverlay && <Overlay />}
    </Stack>
  )
}

export default Room