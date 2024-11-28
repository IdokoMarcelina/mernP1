


function TaskForm({createTask, name, handleInputChange, isEditing, updateTask}) {
  return (
    <div>
      <form action="" onSubmit={isEditing ? updateTask : createTask} className="task-form">
        <input name="name" value={name} onChange={handleInputChange} type="text" placeholder="Add a Task" />
    <button type="submit">{isEditing ? "Edit": "Add"}</button>
      </form>
    </div>
  )
}

export default TaskForm