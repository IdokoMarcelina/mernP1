


function TaskForm({createTask, name, handleInputChange}) {
  return (
    <div>
      <form action="" onSubmit={createTask} className="task-form">
        <input name="name" value={name} onChange={handleInputChange} type="text" placeholder="Add a Task" />
    <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default TaskForm