import React, { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (username.trim() === '') {
      errors.username = 'Username is required';
    }

    if (password === '') {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      // Perform login logic here with username and password
      axios.post('https://task-manager-backend-qxu5.onrender.com/login', {
        username: username,
        password: password
      }).then((res) => {
        if (res.data.status === "success") {
          window.localStorage.setItem("token", res.data.token);
          alert("SignIn Sucessfully!");
          console.log(username);
          navigate('/tasks', {
            state: {
              ref: username
            }
          })
        }
      }).catch((err) => {
        console.log(err);
        alert("Enter Valid Details");
      });

      console.log('Login successful!');
      // Clear form fields
      setUsername('');
      setPassword('');
      setErrors({});
    }

  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <br />
        <p id='register' onClick={() => { navigate('/register') }}>don't have an account? register here!</p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
