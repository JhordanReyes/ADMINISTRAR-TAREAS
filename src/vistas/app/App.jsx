import React, { useContext, useState } from 'react';
import Task from '../../components/task/Task';
import { userContext } from '../../context/UserProvider';
import "./style.css";

const App = () => {

  const [tasks, setTasks] = useState(["tarea", "tarea2"]);
  const {user} = useContext(userContext);

  return (
    <div className='app'>
      <div className='app__information'>
        <h1>My tasks</h1>
        <p>{tasks.length} tasks for <span>Today</span></p>
      </div>
      <div className='app__data'>
        <h2>{user.name}</h2>
      </div>
      <div className='container-tasks'>
        {
          tasks.map((task, i) => (
            <Task
              key={i}
              name={task}
            />
          ))
        }
      </div>
      <button
        onClick={() => setTasks(["nuevo", ...tasks])}
      >+</button>
    </div>
  )
}

export default App