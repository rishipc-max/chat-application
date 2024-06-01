import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { MicrophoneSlash, Monitor, PhoneDisconnect, StopCircle, VideoCamera, VideoCameraSlash } from '@phosphor-icons/react';
import { Microphone } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Video = () => {
  const theme = useTheme();

  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [videoCameraEnabled, setvideoCameraEnabled] = useState(false);
  const [screenSharingEnabled, setscreenSharingEnabled] = useState(false);
  const navigate = useNavigate();

  const handleToggleMicrophone = () => {
    setMicrophoneEnabled((prev) => !prev);
  }  
  const handleTogglevideoCamera = () => {
    setvideoCameraEnabled((prev) => !prev);
  }
  const handleToggleScreenShare = () => {
    setscreenSharingEnabled((prev) => !prev);
  }
  const handleDisconnect = () => {
    navigate("/");
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
        bottom: 20,
        left: "50%",
        transform: 'translateX(-50%)',
        width: "80%",
        bgcolor: theme.palette.primary.light,
        height: 80,
        borderRadius: 20,
      }}>
       <Stack columnGap={2} sx={{height: 1}} direction='row' alignItems='center' justifyContent='center'>
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