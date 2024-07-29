import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ToggleSwitch from "../components/ToggleTheme";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetConnectOnlyWithAudio, SetIdentity, SetRoomId, UpdateIsRoomHost } from "../redux/slices/app";
import { useTheme } from "@mui/material/styles";
import { getRoomExists } from "../utils/api";
import CBYME from "../components/AdvertiseMe";


const Join = () => {

  const dispatch = useDispatch();

  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { isRoomHost, connectionOnlyWithAudio } = useSelector((state) => state.app);
  const titleText = isRoomHost ? "Host Meeting" : "Join Meeting";

  //Returns the current location object,
  //which represents the current URL in web browsers.
  const search = useLocation().search;
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");

    // set in redux store that user is a host
    dispatch(UpdateIsRoomHost(isRoomHost));
  }, []);

  const handleJoinRoom = async () => {
    if (isRoomHost) {
      // join room as a host
      //dispatch action to store nameValue in redux
      dispatch(SetIdentity(nameValue));
      createRoom();
    } else {
      //direct join
      dispatch(SetIdentity(nameValue));
      joinRoom();
    }
  };

  // Incase if the user which is joining is a host then we have to create a new room
  const createRoom = () => {
    navigate("/room");
  };

  // And incase if the user which is joining is not a host.
  // Here we have to check all the conditions like the room is full or not, room is exist or not etc.
  const joinRoom = async () => {
    const response = await getRoomExists(roomIdValue); //Here we are passing the roomIdValue to the server
    const { roomExists, full } = response;

    if (roomExists) {
      if (full) {
        // display error msg
        setErrorMessage("Meeting is full, Please try again later.");
      } else {
        // navigate to the room
        //dispatch action to persist roomIdValue in redux store
        dispatch(SetRoomId(roomIdValue));
        dispatch(SetIdentity(nameValue));
        navigate("/room");
      }
    } else {
      // display error msg
      setErrorMessage("Meeting not found, Check your meeting Id please.");
    }
  };

  const navigate = useNavigate();
  const handleCancelButton = () => {
    navigate("/");
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{ position: "relative" }}>
      <Container>
        <Box
          sx={{
            width: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 4,
              py: 8,
              width: isSmallScreen ? 300 : 400,
              rowGap: 6,
            }}
          >
            <Stack
              spacing={3}
              sx={{
                width: 1,
              }}
            >
              <Typography variant="h3" textAlign="center">
                {titleText}
              </Typography>
              {!isRoomHost && (
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Enter Meeting ID"
                  value={roomIdValue}
                  onChange={(e) => {
                    setRoomIdValue(e.target.value);
                  }}
                />
              )}

              <TextField
                size="small"
                fullWidth
                placeholder="Enter Your Name"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Checkbox value={connectionOnlyWithAudio} onChange={(e) => {
                  dispatch(SetConnectOnlyWithAudio(e.target.checked))
                }}/>
                <Typography variant="subtitle2">Audio only</Typography>
              </Stack>
              {errorMessage && (
                <Typography
                  sx={{
                    color: theme.palette.error.main,
                  }}
                  variant="subtitle1"
                >
                  {errorMessage}
                </Typography>
              )}

              <Stack direction="row" alignItems="center" spacing={2}>
                <Button fullWidth variant="contained" onClick={handleJoinRoom}>
                  {isRoomHost ? "Host" : "Join"}
                </Button>
                <Button
                  onClick={handleCancelButton}
                  fullWidth
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Container>
      <ToggleSwitch />
      <CBYME />
    </div>
  );
};

export default Join;
