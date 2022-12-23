import React, { useEffect } from 'react'
import "./style.css"

const Filtro = ({tasks, filtro, setFiltro, setFiltroTasks}) => {

    const handleFiltroTasks = () => {
        const tasksFiltrado = filtro === ""
            ? tasks
            : tasks.filter((tarea) => tarea.category === filtro);
        setFiltroTasks(tasksFiltrado)
    }

    useEffect(() => {
        handleFiltroTasks();
    }, [filtro, tasks])
    

    return (
        <div className='filtro'>
            <p>Filtrar tarea</p>
            <select
                name="category"
                onChange={ (event) => setFiltro(event.target.value) }
            >
                <option value="">-- Todas las categoría --</option>
                <option value="Cocina">Cocina</option>
                <option value="Estudio">Estudio</option>
                <option value="Comprar">Comprar</option>
                <option value="Juegos">Juegos</option>
                <option value="Ejercicio">Ejercicio</option>
            </select>
        </div>
    )
}

export default Filtro