import React, { useContext, useEffect, useState } from 'react';
import Task from '../../components/task/Task';
import { userContext } from '../../context/UserProvider';
import "./style.css";

const App = () => {

  const { user } = useContext(userContext);

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [task, setTask] = useState({
    "title": "",
    "description": "",
    "category": "",
    "complete": false,
  });
  const [modal, setModal] = useState(false);

  const handleAddTask = (event) => {
    event.preventDefault();
    localStorage.setItem("tasks", JSON.stringify([task, ...tasks]))
    setTasks(JSON.parse(localStorage.getItem("tasks")))
    setModal(false)
    setTask({
      "title": "",
      "description": "",
      "category": "",
      "complete": false,
    })
  }

  const handleModal = () => {
    setModal(true)
  }

  const handleDataTask = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    }
    )
  }

  useEffect(() => {
    const modalTask = document.getElementById("modalTask");
    const app = document.getElementById("app");
    modal
      ? modalTask.style.display = "block"
      : modalTask.style.display = "none";
    modal
      ? app.style.overflow = "hidden"
      : app.style.overflow = "auto";
  }, [modal])


  return (
    <div className='app' id='app'>
      <div className='app__information'>
        <h1>My tasks</h1>
        <p>{tasks.length} tasks for <span>Today</span></p>
      </div>
      <div className='app__data'>
        <h2>{user.name}</h2>
      </div>
      <div className='container-tasks'>
        {
          tasks.length
            ? tasks.map((task, i) => (
              <Task
                key={i}
                task={task}
              />
            ))
            : <p>Registre una tarea..</p>
        }
      </div>
      <button
        className='abrir-modal'
        onClick={handleModal}
      >+</button>
      <div className='modalTask' id='modalTask'>
        <div className='modalTask__container'>
          <i
            className='bx bx-x cerrar-modal'
            onClick={() => setModal(false)}
          ></i>
          <form action="" className='modalTask__container-form'>
            <div className='modalTask-input'>
              <label htmlFor="">Título</label>
              <input
                type="text" name="title"
                placeholder='Ingresar título'
                maxLength={25}
                value={task.title}
                onChange={(event) => handleDataTask(event)}
              />
            </div>
            <div className='modalTask-input'>
              <label htmlFor="">Añade una descripción</label>
              <textarea
                name="description" id="" cols="30" rows="10"
                placeholder='Ingresar descripción'
                value={task.description}
                onChange={(event) => handleDataTask(event)}
              >
              </textarea>
            </div>
            <div className='modalTask-input'>
              <label htmlFor="">Seleccionar una categoría</label>
              <select
                name="category"
                value={task.category}
                onChange={(event) => handleDataTask(event)}
              >
                <option value="">Categoría</option>
                <option value="Osio">Osio</option>
                <option value="Estudio">Estudio</option>
                <option value="Comprar">Comprar</option>
                <option value="Juegos">Juegos</option>
                <option value="Ejercicio">Ejercicio</option>
              </select>
            </div>
            <input
              type="submit"
              value="Añadir Tarea"
              onClick={(event) => handleAddTask(event)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default App