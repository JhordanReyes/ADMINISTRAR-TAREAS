import React, { useEffect, useState } from 'react';
import Edition from '../../components/edition/Edition';
import Grafico from '../../components/grafico/Grafico';
import NoTask from '../../components/noTask/NoTask';
import Task from '../../components/task/Task';
import "./style.css";

const generateID = () => {
  const date = new Date().getTime();
  const number = Math.random();
  return Math.round(date + number);
}

const INITIAL_STATE_TASK = {
  "id": generateID(),
  "title": "",
  "description": "",
  "category": "",
  "complete": false,
}

const App = () => {

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [task, setTask] = useState(INITIAL_STATE_TASK);
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState([]);
  const [editarModal, setEditarModal] = useState(false)
  const [taskEdit, setTaskEdit] = useState({})

  const handleModal = () => {
    setModal(!modal)
  }

  const handleAddTask = (event) => {
    event.preventDefault();
    localStorage.setItem("tasks", JSON.stringify([task, ...tasks]))
    setTasks(JSON.parse(localStorage.getItem("tasks")))
    handleModal()
    setTask({
      "id": generateID(),
      "title": "",
      "description": "",
      "category": "",
      "complete": false,
    })
  }

  const handleCerrarModal = () => {
    handleModal()
    setTask(INITIAL_STATE_TASK)
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

  useEffect(() => {
    const newCounter = tasks.filter((tarea) => tarea.complete != true)
    setCounter(newCounter);
  }, [tasks])

  useEffect(() => {
    const edition = document.getElementById("edition");
    editarModal
      ? edition.style.left = "0%"
      : edition.style.left = "100%";
  }, [editarModal])


  return (
    <div className='app' id='app'>
      <Edition
        setTasks={setTasks}
        tasks={tasks}
        setTaskEdit={setTaskEdit}
        taskEdit={taskEdit}
        editarModal={setEditarModal}
        setEditarModal={setEditarModal}
      />
      <div className='app__information'>
        <h1>Mis tareas</h1>
        {counter.length === 0
          ? <p>No hay tareas</p>
          : counter.length === 1
            ? <p>{counter.length} tarea por <span>hacer</span></p>
            : <p>{counter.length} tareas por <span>hacer</span></p>
        }
      </div>
      <Grafico
        tasks={tasks}
        counter={counter}
      />
      <div className='container-tasks'>
        {
          tasks.length
            ? tasks.map((task, i) => (
              <Task
                key={i}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                setTaskEdit={setTaskEdit}
                editar={editarModal}
                setEditar={setEditarModal}
              />
            ))
            : <NoTask />
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
            onClick={() => handleCerrarModal()}
          ></i>
            <h3>REGISTRAR UNA TAREA</h3>
          <form action="" className='modalTask__container-form'>
            <div className='modalTask-input'>
              <label htmlFor="">Título</label>
              <input
                type="text" name="title"
                placeholder='Ingresar título'
                maxLength={30}
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
                <option value="Cocina">Cocina</option>
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