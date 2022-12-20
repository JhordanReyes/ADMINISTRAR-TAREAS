import React, { useEffect, useState } from 'react';
import "./style.css";

const Task = ({ task }) => {

  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className='task'>
      <div
        className='complete'
        onClick={ () => setIsComplete(!isComplete) }
      >
        {
          isComplete && <i className='bx bx-check'></i>
        }
      </div>
      <p className='task-title'>{task.title} - {task.category}</p>
    </div>
  )
}

export default Task