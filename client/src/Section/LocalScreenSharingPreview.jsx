import { Box } from '@mui/material'
import {useEffect, useRef} from 'react'

// eslint-disable-next-line react/prop-types
const LocalScreenSharingPreview = ({stream}) => {
    const localPreviewRef = useRef();

    useEffect(()=>{
        const videoEl = localPreviewRef.current;
        videoEl.srcObject = stream;
        videoEl.onloadedmetadata = () => {
            videoEl.play();
        }
    }, [stream]);
  return (
    <Box sx={{width: 100, height: 50}}>
        <video muted autoPlay ref={localPreviewRef}></video>
    </Box>
  )
}

export default LocalScreenSharingPreview