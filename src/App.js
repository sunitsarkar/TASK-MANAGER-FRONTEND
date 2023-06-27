
import './App.css';
import LoginPage from './component/login';
import RegistrationPage from './component/reg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Task from './component/task';
import Form from './component/taskform';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path='/tasks' element={<Task/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
