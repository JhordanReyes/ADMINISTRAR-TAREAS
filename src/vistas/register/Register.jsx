import React, { useContext } from 'react';
import { userContext } from '../../context/UserProvider';
import RegisterAvatar from "../../assets/RegisterAvatar.png";
import "./style.css";

const Register = () => {

  const { user, setUser } = useContext(userContext);

  return (
    <div className='register'>
      <div className='register__container'>
        <img src={RegisterAvatar} alt="" />
        <form className='register__container-form'>
          <h3>REGISTRAR DATOS</h3>
          <input
            type="text"
            placeholder='Ingresar nombre'
            onChange={event => setUser(event.target.value)}
          />
          <select name="" id="">
            <option value="">-- GÉNERO --</option>
            <option value="">HOMBRE</option>
            <option value="">MUJER</option>
          </select>
          <input type="submit" value="SIGUIENTE" />
        </form>
      </div>
    </div>
  )
}

export default Register