import React, { useEffect, useState } from 'react'
import "./style.css"

const Edition = ({ setTasks, tasks, setTaskEdit, taskEdit, editarModal, setEditarModal }) => {

    const [editar, setEditar] = useState(false);

    const handleEditTask = (event) => {
        setTaskEdit({
            ...taskEdit,
            [event.target.name]: event.target.value
        })
    }

    const handleEditarTask = () => {
        setEditar(!editar)
    }
    const handleGuardarTask = () => {
        const tasksActualizado = tasks.map(
            (tarea) => tarea.id === taskEdit.id ? taskEdit : tarea
        )
        localStorage.setItem("tasks", JSON.stringify(tasksActualizado))
        setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
    const handleDeleteTask = () => {
        const tasksActualizado = tasks.filter((tarea)=> tarea.id !== taskEdit.id )
        localStorage.setItem("tasks", JSON.stringify(tasksActualizado))
        setTasks(JSON.parse(localStorage.getItem("tasks")))
        setEditarModal(!editarModal)
    }
    const handleModal = () => {
        setEditarModal(!editarModal)
        setEditar(false)
    }

    useEffect(() => {
        const iconEditar = document.getElementById("editar");
        editar
            ? iconEditar.style.background = "rgba(0, 0, 0, 0.1)"
            : iconEditar.style.background = "transparent"
    }, [editar])


    return (
        <div className='edition' id='edition'>
            <i
                className='bx bx-x cerrar-modal cerrar-mobal__edition'
                onClick={() => handleModal()}
            ></i>
            <div className='opciones'>
                <button
                    className='opciones-delete'
                    onClick={ () => handleDeleteTask()}
                >Delete</button>
                <div className='opciones-all'>
                    <i
                        className='bx bx-pencil'
                        onClick={handleEditarTask}
                        id="editar"
                    ></i>
                    <i
                        className='bx bxs-save'
                        onClick={handleGuardarTask}
                    ></i>
                </div>
            </div>
            <form action="">
                <h3>Titulo</h3>
                <input
                    type="text"
                    name='title'
                    value={taskEdit.title}
                    onChange={(event) => handleEditTask(event)}
                    readOnly={`${editar ? "" : "readonly"}`}
                />
                <h3>Categoría</h3>
                <select
                    name="category"
                    value={taskEdit.category}
                    onChange={(event) => handleEditTask(event)}
                    disabled={`${editar ? "" : "disable"}`}
                >
                    <option value="">Categoría</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Comprar">Comprar</option>
                    <option value="Juegos">Juegos</option>
                    <option value="Ejercicio">Ejercicio</option>
                </select>
                <h3>Descripción</h3>
                <textarea
                    name="description" id="" cols="30" rows="10"
                    value={taskEdit.description}
                    onChange={(event) => handleEditTask(event)}
                    readOnly={`${editar ? "" : "readonly"}`}
                ></textarea>
            </form>
            <div
                className={`task-condition ${taskEdit.complete ? "bg-green": "bg-red"}`}>
                {
                    taskEdit.complete
                        ? (
                            <>
                                <i className='bx bx-smile'></i>
                                <p>Tarea completada</p>
                            </>
                        )
                        : (
                            <>
                                <i className='bx bx-tired'></i>
                                <p>Tarea incompleta</p>
                            </>
                        )
                }
            </div>

        </div>
    )
}

export default Edition