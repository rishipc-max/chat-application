import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { MicrophoneSlash, Monitor, PhoneDisconnect, StopCircle, VideoCamera, VideoCameraSlash } from '@phosphor-icons/react';
import { Microphone } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import * as webRTCHandler from "../../utils/webRTCHandler";
import LocalScreenSharingPreview from '../LocalScreenSharingPreview';

const constraints = {
  audio: false,
  video: true,
}

const Video = () => {
  const theme = useTheme();

  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [videoCameraEnabled, setvideoCameraEnabled] = useState(true);
  const [screenSharingEnabled, setScreenSharingEnabled] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleToggleMicrophone = () => {
    webRTCHandler.toggleMic(microphoneEnabled);
    setMicrophoneEnabled((prev) => !prev);
  }  
  const handleTogglevideoCamera = () => {
    webRTCHandler.toggleCamera(videoCameraEnabled);
    setvideoCameraEnabled((prev) => !prev);
  }
  const handleToggleScreenShare = async () => {
    //setscreenSharingEnabled((prev) => !prev);
    if(!screenSharingEnabled){
      let stream = null;
      try{
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      }catch(err) {
        console.log("error occured when trying to get access to screen sharing stream")
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.toggleScreenShare(screenSharingEnabled, stream)
        setScreenSharingEnabled(true);
        // execute function to switch the video track which we are sending to otherss users with scrren share stream
      }
    } else {
      // switch the video track from camera
      webRTCHandler.toggleScreenShare(screenSharingEnabled)
      setScreenSharingEnabled(false);

      // stop screen share stream
      screenSharingStream.getTracks().forEach(t => {
        t.stop();
      });
      setScreenSharingStream(null);
    }
  }

  const handleDisconnect = () => {
   // navigate("/");
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  }
  
  return (
    <Box sx={{
        flexGrow: 1,
        position: "relative",
        height: 1,
    }}>

      {/* Controls */}
      <Box sx={{
        position: 'absolute',
        bottom: 5,
        left: "50%",
        transform: 'translateX(-50%)',
        width: "40%",
       // bgcolor: theme.palette.primary.light,
        height: 80,
        borderRadius: 20,
      }}>
       <Stack spacing={1} columnGap={2} sx={{height: 1}} direction='row' alignItems='center' justifyContent='center'>
         {screenSharingEnabled && <LocalScreenSharingPreview stream={screenSharingStream}/>}
         <Box sx={{
          display: 'flex',
          alignItems: "center",
          justifyContent: 'center',
          p: 0.5,
          borderRadius: 4,
          bgcolor: theme.palette.grey[100]
         }}>
           <IconButton 
           sx={{
            color: "black"
           }} 
           onClick={handleToggleMicrophone}>
             {microphoneEnabled ? <Microphone /> : <MicrophoneSlash />}
           </IconButton>
         </Box>

         <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.5,
          borderRadius: 4,
          bgcolor: theme.palette.grey[100]
         }}>
           <IconButton 
           sx={{
            color: "black"
           }} 
           onClick={handleTogglevideoCamera}>
             {videoCameraEnabled ? <VideoCamera /> : <VideoCameraSlash />}
           </IconButton>
         </Box>

         <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.5,
          borderRadius: 4,
          bgcolor: theme.palette.grey[100]
         }}>
           <IconButton 
           sx={{
            color: "black"
           }} 
           onClick={handleToggleScreenShare}>
             {!screenSharingEnabled ? <Monitor /> : <StopCircle />}
           </IconButton>
         </Box>

         <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.5,
          borderRadius: 4,
          bgcolor: theme.palette.error.main
         }}>
           <IconButton 
           sx={{
            color: theme.palette.common.white
           }} 
           onClick={handleDisconnect}>
            <PhoneDisconnect />
           </IconButton>
         </Box>
       </Stack>
         
      </Box>
    </Box>
  )
}

export default Video