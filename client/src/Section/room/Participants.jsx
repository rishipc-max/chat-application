import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import { useSelector } from "react-redux";


const Participants = () => {
  const theme = useTheme();
  const { participants } = useSelector((state) => state.app);
  return (
    <Box sx={{
        p: 2,
        width: 320,
        height: 1,
        display: "flex",
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`
    }}>
        <Box sx={{
            p: 2,
            display: 'flex',
            flexDirection: "column",
            rowGap: 2
        }}>
            <Typography variant="subtitle1">
                Participants
            </Typography>
            <Stack>
                {participants.map(({ id, identity }) => (
                    <Stack spacing={1} key={id}>
                        <Box sx={{
                        px: 3, 
                        py: 1,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: theme.palette.grey[100],
                        },
                        }}>
                          <Typography>{identity}</Typography>
                        </Box>
                        <Divider />
                    </Stack>
                ))}
            </Stack>
        </Box>
    </Box>
  )
}

export default Participants