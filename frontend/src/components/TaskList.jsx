import TaskForm from "./TaskForm"
import Task from './Task'
import { useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "../config/axios"


function TaskList() {
  const [formData, setFormData] = useState({
    name: "",
    completes: false
  })

 // const {name}= FormData

  const handleInputChange = (e)=>{
      const {name, value} = e.target
      setFormData({...formData, [name]: value})
  }
  const createTask = async (e)=>{
    e.preventDefault()
    console.log(formData);
    if(name === ''){
      return toast.error('input field cannot be empty');
    }
    try {
      await axiosInstance.post('/api/tasks', formData).then((res) => {
        console.log(res);
        
        setFormData({...formData, name: ''})
      }).catch((err) => {
        console.log(err);
        
      })

    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
}
  return (
    <>
    <h2>Task Manager</h2>
    <TaskForm name={name} handleInputChange={handleInputChange}
    createTask={createTask}/>
    <div className="--flex-between --pb">
      <p>
        <b>Total Tasks:</b> 0
      </p>
      <p>
        <b>Completed Tasks:</b> 0
      </p>
    </div>
    <hr />
    <Task/>
    </>
  )
}

export default TaskList