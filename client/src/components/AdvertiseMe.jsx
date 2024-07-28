import { Box, Typography } from "@mui/material"
import Logo from "../assets/hlogo.png";

const AdvertiseMe = () => {
  return (
    <>
    <Box sx={{
        width:'230px',
        position: 'absolute',
        bottom: '12px',
        left:  "51%",
        transform: "translateX(-50%)",
    }}>
      
     <Typography fontFamily={'monospace'} variant="h6"> Created By<span> </span><img src={Logo} alt="R" width={20}/> 
      ishi Patel</Typography> 
    </Box>
    </>
  )
}

export default AdvertiseMe
