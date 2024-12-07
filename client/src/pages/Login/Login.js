import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import '../../assets/styles/login.css';
import { jwtDecode } from 'jwt-decode';
import UsersContext from '../../contexts/UsersContext';
import { TokenContext } from '../../contexts/TokenContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { handleLogin } = useContext(UsersContext);
    const { token } = useContext(TokenContext);

    useEffect(() => {
        if (token) {
            handleLogin(jwtDecode(token));
            navigate('/dashboard');
        }
    }, [token, navigate, handleLogin]);

    const handleChange = (event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
            setEmailError('');
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
            setPasswordError('');
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/login/', { email, password });
            if (response.status === 200) {
                const token = response.data.access_token;
                sessionStorage.setItem('authToken', token);
                handleLogin(jwtDecode(token));
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error occurred while logging in:', error.message);
            setPasswordError('Invalid email or password');
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
                        style={{ marginBottom: '20px', width: '100%' }}
                        error={Boolean(emailError)}
                        helperText={emailError}
                    />

                    <TextField
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        required
                        fullWidth
                        value={password}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', width: '100%' }}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
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
