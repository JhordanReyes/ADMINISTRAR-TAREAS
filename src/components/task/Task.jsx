import React, { useEffect, useState } from 'react';
import "./style.css";

const Task = ({ task, tasks, setTasks, setTaskEdit, editar, setEditar }) => {

  const [isComplete, setIsComplete] = useState(task.complete);

  const handleCompleteTask = () => {
    setIsComplete(!isComplete)
  }
  
  const handleEditar = () => {
    setEditar(!editar)
    setTaskEdit(task)
  }

  useEffect(() => {
    const tasksUpdate = tasks.map( (tarea) => tarea.id === task.id ? { ...task, "complete": isComplete }: tarea )
    setTasks( tasksUpdate )
    localStorage.setItem("tasks", JSON.stringify(tasksUpdate))
  }, [isComplete])
  

return (
  <div className='task'>
    <div
      className={`complete ${task.complete ? "background-purple": ""}`}
      onClick={() => handleCompleteTask()}
    >
      {
        isComplete && <i className='bx bx-check'></i>
      }
    </div>
    <p
      className={`task-title ${task.complete ? "tachado" : ""}`}
      onClick={ ()=> handleEditar() }
    >{task.title} - {task.category}</p>
  </div>
)
}

export default Task