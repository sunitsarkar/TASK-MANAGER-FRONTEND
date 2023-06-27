import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import './task.css'

export default function Task(){
    const headers = { "Authorization": localStorage.getItem("token") };
    const [show,setShow]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    // console.log(location.state.ref)
    const ref=location.state.ref;
    const [tasks,setTasks]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/tasks?ref=${ref}`,{ headers }).then(
            (res)=>{
                console.log(res.data);
                setTasks(res.data)
                if(res.data){
                    setShow(true);
                }
            }
        )
    });

    const handelCreate=()=>{
        navigate('/form',{
            state:{
                ref:ref
            }
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        alert("Logged Out");
        document.location.reload()
      }

      const handelDelete=(e)=>{
        e.preventDefault();

      }

    if(show){
        return <div id="taskContaner">
            <button onClick={handleLogout} id="logout">logout</button>
            <hr/>
            <div>
            <button onClick={handelCreate} id="create">cretate task</button>
            <div id="task-container">
                {
                    tasks.map((item)=>{
                         return <div className="task">
                            <h3>{item.task}</h3>
                            <button onClick={handelDelete} className="btn">delete</button>
                            <button className="btn">update</button>
                        </div>
                    })
                }
            </div>
            </div>
            
       
    </div>
    }
    else{
        return <div>
        non authorized user
    </div>
    }
}