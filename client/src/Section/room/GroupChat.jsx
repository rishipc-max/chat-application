import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PaperPlaneTilt } from "@phosphor-icons/react"


const GroupChat = () => {
  const theme = useTheme();
  return (
    <Box sx={{
        width: 320,
        height:1,
        borderLeft: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
    }}>
        <Typography 
        variant="subtitle1" 
        sx={{
          color: "text.secondary"
        }}>Group Chat</Typography>
        <Box sx={{flexGrow: 1}}></Box>
        <TextField 
        placeholder="Send a message..." 
        size="small"
        InputProps={{
            endAdornment: <InputAdornment position="end">
                <IconButton>
                 <PaperPlaneTilt />
                </IconButton>
            </InputAdornment>
        }} />
    </Box>
  )
}

export default GroupChat