import React, { useContext, useState } from 'react';
import { userContext } from '../../context/UserProvider';
import RegisterAvatar from "../../assets/RegisterAvatar.png";
import "./style.css";

const Register = ({setRegisterIsComplete}) => {

  const { user, setUser } = useContext(userContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!(user.name === "" || user.gender === "")){
      localStorage.setItem("registerIsComplete", true)
      setRegisterIsComplete(true)
    }else{
      console.log("faltan datos")
    }
    localStorage.setItem("user", JSON.stringify(user) );
  }


  const handleDataUser = (event) => {
    setUser( {
      ...user,
      [event.target.name]: event.target.value,
    } )
  }

  return (
    <div className='register'>
      <div className='register__container'>
        <img src={RegisterAvatar} alt="" />
        <form
          className='register__container-form'
          onSubmit={ (event) => handleSubmit(event)}
        >
          <h3>REGISTRAR DATOS</h3>
          <input
            type="text"
            placeholder='Ingresar nombre'
            name='name'
            onChange={event => handleDataUser(event)}
          />
          <select
            name="gender"
            onChange={ (event) => handleDataUser(event) }
          >
            <option value="">-- Género --</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
          <input
            type="submit"
            value="SIGUIENTE"
          />
        </form>
      </div>
    </div>
  )
}

export default Register