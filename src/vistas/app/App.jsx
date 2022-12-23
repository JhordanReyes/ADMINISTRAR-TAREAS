import React, { useEffect, useState } from 'react';
import { alertCompleteForm } from '../../components/Alert';
import Edition from '../../components/edition/Edition';
import Filtro from '../../components/filtro/Filtro';
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

const App = ({ setRegisterIsComplete }) => {

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));
  const [task, setTask] = useState(INITIAL_STATE_TASK);
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState([]);
  const [editarModal, setEditarModal] = useState(false)
  const [taskEdit, setTaskEdit] = useState({})
  const [filtro, setFiltro] = useState("")
  const [filtroTasks, setFiltroTasks] = useState([])
  const handleModal = () => {
    setModal(!modal)
  }

  const handleAddTask = (event) => {
    event.preventDefault();
    if ((task.title === "" || task.category === "")) {
      alertCompleteForm()
      return
    }
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

  const handleResetApp = () => {
    localStorage.setItem("tasks", JSON.stringify([]))
    localStorage.setItem("registerIsComplete", false)
    localStorage.setItem("user", JSON.stringify({
      name: "",
      gender: "",
    }))
    setRegisterIsComplete(false)
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
        <button
        className='app__information-btn'
          onClick={handleResetApp}>Reiniciar App</button>
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
      <Filtro tasks={tasks} filtro={filtro} setFiltro={setFiltro} setFiltroTasks={setFiltroTasks} />
      <div className='container-tasks'>
        {
          filtroTasks.length
            ? filtroTasks.map((task, i) => (
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
          <h3 className='modalTask__container-title'>REGISTRAR UNA TAREA</h3>
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
                <option value="">-- Categorías --</option>
                <option value="Cocina">Cocina</option>
                <option value="Estudio">Estudio</option>
                <option value="Comprar">Comprar</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Ejercicio">Ejercicio</option>
                <option value="Salud">Salud</option>
                <option value="Viaje">Viaje</option>
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