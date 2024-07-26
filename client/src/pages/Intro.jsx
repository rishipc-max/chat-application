import { Box, Button, Card, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../components/ToggleTheme";

const Intro = () => {

  const navigate = useNavigate();

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true")
  }
  const pushToJoinRoomPage = () => {
    navigate('/join-room')
  }

  return (
    <div style={{position: 'relative'}}>
<Container>
      <Box sx={{
        width: 1,
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Card sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
          py: 8,
          width: 400,
          rowGap: 6
        }}>
          <Typography variant="h3" textAlign='center'>
            Hangout
          </Typography>
          <Stack sx={{width: 1}} direction='column' alignItems='center' spacing={2}> 
            <Button onClick={pushToJoinRoomPageAsHost} variant="contained" fullWidth>Host Meeting</Button>
            <Button onClick={pushToJoinRoomPage} variant="outlined" fullWidth>Join Meeting</Button>
          </Stack>
        </Card>
      </Box>  
    </Container>
    <ToggleSwitch />
    </div>
  )
}

export default Intro