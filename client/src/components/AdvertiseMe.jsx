import { Box, Typography } from "@mui/material"
import Logo from "../assets/hlogo.png";

const AdvertiseMe = () => {
  return (
    <>
    <Box textAlign={'center'} sx={{
        width:'100%',
        position: 'absolute',
        bottom: '12px',
    }}>
      
     <Typography fontFamily={'monospace'} variant="h6"> Created By<span> </span><img src={Logo} alt="R" width={20}/> 
      ishi Patel</Typography> 
    </Box>
    </>
  )
}

export default AdvertiseMe
