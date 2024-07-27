import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ChatBox from "../../components/ChatBox";


const Participants = () => {
  const theme = useTheme();
  const { participants } = useSelector((state) => state.app);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
    
      position={"relative"}
      justifyContent={"space-between"}
      sx={{
        p: 2,
        width: 320,
        height: 1,
        display: isSmallScreen ? "none" : "flex",
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <Typography variant="subtitle1">Participants</Typography>
        <Stack>
          {participants.map(({ id, identity }) => (
            <Stack spacing={1} key={id}>
              <Box
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800],
                    //bgcolor: theme.palette.grey[800],
                  },
                }}
              >
                <div>
                <Typography>{identity}</Typography>
                </div>
                
              </Box>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
         // border: `2px solid ${theme.palette.divider}`
        }}
      >
        {/* ChatBox */}
        <ChatBox />
      </Box>
    </Box>
  );
};

export default Participants;
