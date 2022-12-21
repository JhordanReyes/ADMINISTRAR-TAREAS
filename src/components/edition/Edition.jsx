import React from 'react'
import "./style.css"

const Edition = ({ taskEdit, editar, setEditar }) => {
    return (
        <div className='edition' id='edition'>
            <i
                className='bx bx-x cerrar-modal cerrar-mobal__edition'
                onClick={() => setEditar(!editar)}
            ></i>
            <form action="">
                <h3>Titulo</h3>
                <input
                    type="text"
                    value={taskEdit.title}
                />
                <h3>Categoría</h3>
                <select
                    name="category"
                    value={taskEdit.category}
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
                    name="" id="" cols="30" rows="10"
                    value={taskEdit.description}
                ></textarea>
            </form>
        </div>
    )
}

export default Edition