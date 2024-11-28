import TaskForm from "./TaskForm"
import Task from './Task'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "../config/axios"
import { URL } from "../App"
import loadingImg from '../assets/loader.gif'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTask] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isEditing, setisEditing] = useState(false)
  const [taskID, setTaskID] = useState('')


  const [formData, setFormData] = useState({
    name: "",
    completed: false
  })

 const {name}= formData

  const handleInputChange = (e)=>{
      const {name, value} = e.target
      setFormData({...formData, [name]: value})
  }

  const getTasks = async () => {
    setisLoading(true)
    try {
    const {data} =  await axiosInstance.get(`${URL}/api/tasks`)

    setTasks(data);
    setisLoading(false);
    
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      setisLoading(false)
      
    }
  }

  useEffect(() => {
    getTasks()
  }, [])
  
  
  const createTask = async (e)=>{
    e.preventDefault()
    console.log(formData);
    if(name === ''){
      return toast.error('input field cannot be empty');
    }
    try {
      await axiosInstance.post(`${URL}/api/tasks`, formData)
      .then((res) => {
        console.log(res);
        toast.success('Task added successfully')
        setFormData({...formData, name: ''})
        getTasks();
      }).catch((err) => {
        console.log(err);
        
      })

    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
}

const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`${URL}/api/tasks/${id}`)
    getTasks()
  } catch (error) {
    toast.error(error.message)
    
  }
};

const getSingleTask = async (task) => {
  setFormData({name: task.name, completed: false})
  setTaskID(task._id)
  setisEditing(true)
};

const updateTask = async (e) => {
  e.preventDefault()
  if(name === ''){
    return toast.error('input field cannot be empty')

  }
  try {
    await axiosInstance.put(`${URL}/api/tasks/${taskID}`, formData)
    setFormData({...formData, name: ''})
    setisEditing(false)
    getTasks()
  } catch (error) {
    toast.error(error.message)
  }
};

const setToComplete = async (task) => {
  const newformData = {
    name: task.name,
    completed: true
  }
  try {
    await axiosInstance.put(`${URL}/api/tasks/${task._id}`, newformData)
    getTasks()
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(() => {
  const cTask = tasks.filter((task)=>{
    return task.completed === true
  })

  setCompletedTask(cTask)
}, [tasks])



  return (
    <>
    <h2>Task Manager</h2>
    <TaskForm 
    name={name} 
    handleInputChange={handleInputChange}
    isEditing ={isEditing}
    createTask={createTask}
    updateTask={updateTask}
     />
     {
      tasks.length > 0 && (
        <div className="--flex-between --pb">
      <p>
        <b>Total Tasks:</b> {tasks.length}
      </p>
      <p>
        <b>Completed Tasks:</b> {completedTasks.length}
      </p>
    </div>
      )
     }
    
    <hr />
    {
      isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )
    }

    {
      !isLoading && tasks.length === 0
       ?( 
        <p className="--py">No task added. Please add a task</p>
       ) 
       :(
        <>
        {tasks.map((task, index)=>(

        <Task 
         key={task._id}
         task={task}
         index={index}
         deleteTask={deleteTask}
         getSingleTask={getSingleTask}
         setToComplete={setToComplete}
         />
        ))}
        </>
       )
    }
    </>
  )
}

export default TaskList