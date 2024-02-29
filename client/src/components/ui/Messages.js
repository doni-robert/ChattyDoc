import React from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Download, Image } from "@mui/icons-material";
import "../../assets/styles/messages.css";

const Timeline = ({ el }) => {
  return (
    <div className="timeline-section">
      <Divider width="46%" />
      <div className="time">
        <p>{el.text}</p>
      </div>
      <Divider width="46%" />
    </div>
  );
};

const TextMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming ? "#242657" : "#F0F8FF",
          borderRadius: 1.5,
          width: "max-content",
          margin: "2.5px 0",
        }}
      >
        <Typography variant="body2" color={el.incoming ? "#fff" : "#000"}>
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};

const MediaMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming ? "#242657" : "#F0F8FF",
          borderRadius: 1.5,
          width: "max-content",
          margin: "2.5px 0",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 150, borderRadius: "10px" }}
          />
          <Typography variant="body2" color={el.incoming ? "#fff" : "#000"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const ReplyMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming ? "#242657" : "#F0F8FF",
          borderRadius: 1.5,
          width: "max-content",
          margin: "2.5px 0",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            alignItems="center"
            sx={{ backgroundColor: "#242657", borderRadius: 1 }}
          >
            <Typography variant="body2" color={"#fff"}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant="body2" color={el.incoming ? "#fff" : "#000"}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const LinkMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming ? "#242657" : "#F0F8FF",
          borderRadius: 1.5,
          width: "max-content",
          margin: "2.5px 0",
        }}
      >
        <Stack spacing={0.5}>
          <Stack
            p={1}
            alignItems="center"
            direction="column"
            sx={{ backgroundColor: "#242657", borderRadius: 1 }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 150, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography
                variant="subtitle2"
                color={el.incoming ? "#fff" : "#000"}
              >
                Creating Chatty Doc
              </Typography>
              <Typography
                variant="caption"
                component={Link}
                sx={{ color: "blue" }}
                to="/home"
              >
                chattydoc.org
              </Typography>
            </Stack>
            <Typography variant="body2" color={el.incoming ? "#fff" : "#000"}>
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

const DocMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming ? "#242657" : "#F0F8FF",
          borderRadius: 1.5,
          width: "max-content",
          margin: "2.5px 0",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={1}
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ backgroundColor: "#242657" }}
          >
            <Image size={20} />
            <Typography
              variant="subtitle2"
              sx={{ color: el.incoming ? "#fff" : "#000" }}
            >
              documentation.pdf
            </Typography>
            <IconButton>
              <Download />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: el.incoming ? "#fff" : "#000" }}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMessage,
  DocMessage,
};
