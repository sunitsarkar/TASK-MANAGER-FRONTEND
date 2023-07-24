import './taskform.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Form() {
  const [inputValue, setInputValue] = useState('');
  const location=useLocation();
  const navigate=useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const headers = { "Authorization": localStorage.getItem("token") };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://task-manager-backend-qxu5.onrender.com/tasks',{
        task:inputValue,
        ref:location.state.ref
    },{headers}).then((res)=>{
        // console.log(res)
    })
    // console.log('Submitted:', inputValue);
    setInputValue('');
    navigate('/tasks',{
        state:{
          ref:location.state.ref
        }
      })
  };

  return (
    <form onSubmit={handleSubmit} id='formcontainer'>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter your task"
        id='forminput'
      />
      <button type="submit" id='formbutton'>
        Add Task
      </button>
    </form>
  );
};




