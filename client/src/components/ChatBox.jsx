import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
//import styled from "@emotion/styled";
import { useState } from "react";
import { CaretDown, CaretUp, PaperPlaneTilt, Smiley, X } from "phosphor-react";
import { useSelector } from "react-redux";

const ChatBox = () => {
  const participants = useSelector((state) => state.app.participants);
  const filterParticipants = participants.filter((participant) => participant.socketId === participant.socketId);
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const toggleChat = () => {
    setExpanded(!expanded);
  };

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      setMessages([...messages, messageInput]);
      setMessageInput('');
    }
  }

  return (
    <Box
      p={1.5}
      sx={{
        position: "fixed",
        bottom: 10,
        left: "10.2%",
        transform: "translateX(-50%)",
        width: 300,
        maxHeight: expanded ? 400 : 70,
        overflow: "hidden",
        transition: "max-height 0.3s ease",
        backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : "#202834",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Stack direction={"row"} spacing={2}>
          <Box>
            <Avatar src={faker.image.avatar()}></Avatar>
          </Box>
          <Stack spacing={0.2}>
            <Stack direction={"row"} spacing={1}>
            {filterParticipants.map(({ id, identity }) => (
            <Stack direction={"row"}  key={id}> <Typography variant="subtitle2">{identity}<span>,</span></Typography> </Stack>
           ))}
            </Stack>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <IconButton onClick={toggleChat} sx={{ width: "max-content" }}>
         {expanded ? <X size={20}/> : <CaretUp />}
        </IconButton>
      </Stack>

      {expanded && (
        <Box paddingTop={1}>
          <Box
            sx={{
              height: 270,
              overflowY: "scroll",
              padding: 2,
              flexGrow: 1,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#fff"
                  : theme.palette.background.neutral,
            }}
          >
            <Stack spacing={2}>
              {messages.map((message, index) => (
                  <Box key={index} sx={{ 
                    bgcolor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800], 
                    padding: 1, 
                    borderRadius: 1 }}>
                    <Typography variant="body2">{message}</Typography>
                  </Box>
                ))}
            </Stack>
          </Box>
          <Box
            paddingTop={1}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#F8FAFF" : "#202834",
            }}
          >
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <Box sx={{
                  height: 44,
                }}>
              <TextField
                maxHeight = {10}
                value={messageInput}
                variant="filled"
                placeholder="write a message"
                InputProps={{
                  disableUnderline: "true",
                  endAdornment: (
                   <InputAdornment>
                      <IconButton sx={{ width: "max-content" }}>
                        <Smiley />
                      </IconButton>
                   </InputAdornment>
                  ),
                }}
               onChange={(e) => setMessageInput(e.target.value)}
              >
              </TextField>
              </Box>
              <Box
                p={1}
                sx={{
                  height: 44,
                  width: 44,
                  borderRadius: 1.5,
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                <Stack
                  sx={{ height: "100%", width: "100%" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <IconButton onClick={sendMessage}>
                    <PaperPlaneTilt color="#fff" />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
