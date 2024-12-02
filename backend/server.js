const dotenv = require("dotenv").config()
const express = require('express');
const connectDB = require('./config/connectDB');
const Task = require("./models/taskModel");
const cors = require('cors')

const taskRoutes = require('./routes/taskRoute')


//middlware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:3000']
}));
app.use('/api/tasks',taskRoutes);


// const logger = (req, res, next)=>{
//     console.log("middleware ran")
//     console.log(req.method);
    
//     next();
    
// }

//routes
app.get('/', (req, res)=>{
    res.send('Home page')
})


// //create a task
// app.post('/api/tasks',  async (req, res)=>{

//     // console.log(req.body)
//     // res.send('task created')

//     try{
//         const task= await Task.create(req.body)
//         res.status(200).json(task)
//     }catch(error){
//         console.log(error);
//         res.status(500).json({msg: error.message})
//     }
    
// })

// //get/read tasks

// app.get('/api/tasks', async (req, res)=>{
//     try{
//         const tasks = await Task.find()
//         res.status(200).json(tasks)
//     }catch(error){
//         res.status(500).json({
//             msg: error.message
//         })
//     }
// })



const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`this port is running on'+ ${PORT}`)
});

const startServer = async ()=>{
    try{
        await connectDB();
    }catch(error){
        console.log(error);
        
    }
}

startServer();