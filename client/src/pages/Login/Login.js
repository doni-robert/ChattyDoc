import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "../../assets/styles/login.css";
import API_URL from "../../config";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Token exists, user is already logged in hence redirect to dashboard
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  });

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
      setEmailError("");
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      setPasswordError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (!validateEmail()) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email,
        password,
      });
      console.log("Login Response:", response);

      if (response.status === 200) {
        // Save token to local storage
        const token = response.data.access_token;
        localStorage.setItem("jwtToken", token);
        setIsLoggedIn(true);

        // Login successful, redirect to the dashboard
        navigate("/dashboard");
      } else {
        console.log("Login failed: Invalid email or password");
        setPasswordError("Invalid email or password");

        // Add your logic to display an error message or handle the error accordingly
      }
    } catch (error) {
      console.log("Error occurred while logging in:", error.message);
      setPasswordError("Invalid email or password");
      // Add your logic to display an error message or handle the error accordingly
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleFormSubmit}>
          <TextField
            name="email"
            type="email"
            label="Email"
            required
            fullWidth
            value={email}
            onChange={handleChange}
            style={{ marginBottom: "20px", width: "100%" }}
            error={
              Boolean(email) && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            }
            helperText={emailError}
          />

          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            required
            fullWidth
            value={password}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "100%" }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="button-container">
            <Button type="submit" variant="contained" className="login-button">
              Login
            </Button>
          </div>
          <div className="signup-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
