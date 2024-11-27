const express = require('express')
const Task = require('../models/taskModel')
const { createTask,  getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController')

const router = express.Router()




//get/read tasks
// router.post('/api/tasks', createTask)
// router.get('/api/tasks', getTasks)
// router.get('/api/tasks/:id', getTask)
// router.delete('/api/tasks/:id', deleteTask)
// router.put('/api/tasks/:id', updateTask)


// router.route('/').get(getTasks).post(createTask);
// router.route('/:id').get(getTask).delete(deleteTask).put(updateTask);

router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id', getTask)
router.delete('/:id', deleteTask)
router.put('/:id', updateTask);




module.exports = router