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
    const [update,setUpdate]=useState('')

    useEffect(()=>{
        axios.get(`http://localhost:8000/tasks?ref=${ref}`,{ headers }).then(
            (res)=>{
                // console.log(res.data);
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

    //   const handelDelete=(e)=>{
    //     e.preventDefault();
    //     const id=item._id
    //     // axios.delete(`http://localhost:8000/tasks:`)
    //     console.log(id)
    //     console.log("sunit")
    //   }

    if(show){
        return <div id="taskContaner">
            <button onClick={handleLogout} id="logout">logout</button>
            <hr/>
            <div>
            <button onClick={handelCreate} id="create">Cretate New Task</button>
            <br/><br/>
            <div id="task-container">
                {
                    tasks.map((item)=>{
                         return <div className="task">
                            <h3>{item.task}</h3>
                            <input placeholder="enter text to update" onChange={(e)=>{setUpdate(e.target.value)}}/>
                            <button className="btn" onClick={(e)=>{
                                e.preventDefault();
                                axios.put(`http://localhost:8000/tasks?id=${item._id}`,{
                                    task:update,
                                    ref:ref
                                })
                                setUpdate('')
                            }} >update</button>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                axios.delete(`http://localhost:8000/tasks?id=${item._id}`)
                                // console.log(item._id)
                            }} className="btn">delete</button>
                        </div>
                    })
                }
            </div>
            </div>
            
       
    </div>
    }
}