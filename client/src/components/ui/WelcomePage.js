import React from "react";
import { Outlet } from "react-router-dom";
import { Stack, Typography, Container } from "@mui/material";
import welcomeImage from "../../assets/images/welcome.jpg";

const WelcomePage = () => {
  return (
    <>
      <Container sx={{ mt: 10 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img
              style={{ height: 300, width: 500, marginTop: "50px" }}
              src={welcomeImage}
              alt="welcome"
            />
          </Stack>
          <Outlet />
          <Stack alignItems={"center"}>
            <Typography variant="h5">
              Select a chat to start messaging
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default WelcomePage;
