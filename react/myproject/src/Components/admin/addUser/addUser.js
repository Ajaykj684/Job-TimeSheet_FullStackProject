import React, { useState,  } from "react";

import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MoonHive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [msg, setMsg] = useState("");

  const history = useNavigate();

  const formdata = (e) => {
    e.preventDefault();
    if (
      email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
      username.length > 1 &&
      password.length > 3 &&
      phone.length > 3
    ) {
      Axios({
        method: "post",
        url: "http://127.0.0.1:8000/add/",
        data: {
          username: username,
          email: email,
          password: password,
          phone: phone,
        },
        headers: {
          "content-type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          history("/admin");
        } else {
          alert("something went wrong !");
        }
      });
    } else {
      setMsg("Please fill the form correctly");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD USER
          </Typography>


          {msg && <h1 className="text-orange-500 text-medium">{msg}</h1>}
          
          <Box component="form" noValidate onSubmit={formdata} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  id="fname"
                  name="username"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="Phone"
                  name="tel"
                  placeholder="Phone Number.."
                  label="Phone Number"
                  autoComplete="Phone"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Email.."
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="Password.."
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
