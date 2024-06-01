import { Box, CircularProgress, alpha } from "@mui/material"

const Overlay = () => {
  return (
    <Box sx={{
        position: 'absolute',
        height: "100vh",
        width: "100vw",
        bgcolor: (theme) => alpha(theme.palette.grey[700], 0.6),
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CircularProgress />
    </Box>
  )
}

export default Overlay