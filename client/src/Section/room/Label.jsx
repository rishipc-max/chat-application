import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import { useSelector } from "react-redux";

const Label = () => {
  //const roomId = "1234";
  const theme = useTheme();
  const { roomId } = useSelector((state) => state.app);  return (
    <Box sx={{
        position: 'absolute',
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        py: 2,
        px: 3,
        bgcolor: theme.palette.primary.main,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        color: theme.palette.primary.contrastText
    }}>
      <Typography variant="subtitle1">
        ID: {roomId}
      </Typography>
    </Box>
  )
}

export default Label