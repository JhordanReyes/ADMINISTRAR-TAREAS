import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./style.css"

const Grafico = ({ tasks, counter }) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        const taskCompletadas = tasks.length - counter.length;
        setValue(Math.round((taskCompletadas / tasks.length) * 100))
    }, [counter])

    return (
        <div className='grafico'>
            <div className='grafico__data'>
                <p>Total de tareas: {tasks.length}</p>
                <p>Tareas realizadas: {tasks.length - counter.length}</p>
            </div>
            <div className='grafico__circular'>
                <CircularProgressbar
                    text={`${isNaN(value) ? 0 : value}%`}
                    value={value}
                    styles={buildStyles({
                        pathTransitionDuration: 0.8,
                        pathColor: `var(--color-grafico)`,
                        textColor: `var(--color-grafico)`,
                        trailColor: 'white',
                    })}
                />
            </div>
        </div>
    )
}

export default Grafico