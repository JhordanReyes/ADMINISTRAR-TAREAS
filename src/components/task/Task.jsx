import React from 'react';
import "./style.css";

const Task = ({name, description}) => {
  return (
    <div className='task'>
      <h2>{name}</h2>
      <p>{description ? description : "No hay decripción"}</p>
    </div>
  )
}

export default Task