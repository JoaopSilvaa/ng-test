import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendData } from '../services/requests';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [failedTryRegister, setFailedTryRegister] = useState(false);
    const [registred, setRegistred] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const register = async (event: any) => {
        event.preventDefault();
        
        try {
            await sendData('/users', { username, password });
            setRegistred(true);
            setTimeout(() => setRegistred(false), 1000);
        } catch (error){
            setFailedTryRegister(true);
            setTimeout(() => setFailedTryRegister(false), 3000);
        }
    }

    const handleChange = ({ target }: any) => {
        if (target.name === 'username') {
            setUsername(target.value);
        } else if (target.name === 'password') {
            setPassword(target.value);
        }
        const regex = /(?=.*[A-Z])(?=.*[0-9]).*$/;
        if (username.length > 3 && password.length > 8 && regex.test(password)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const show = ({ target }: any) => {
        if (!target.width) {
          const svg = target.parentElement;
          const div = svg.parentElement;
          const input = div.firstChild;
          input.type='text';
          setVisibility(true);
        } else {
          const div = target.parentElement;
          const input = div.firstChild;
          input.type='text';
          setVisibility(true);
        }
      }
  
      const dontshow = ({ target }: any) => {
        if (!target.width) {
          const svg = target.parentElement;
          const div = svg.parentElement;
          const input = div.firstChild;
          input.type='password';
          setVisibility(false);
        } else {
          const div = target.parentElement;
          const input = div.firstChild;
          input.type='password';
          setVisibility(false);
        }
      }

    useEffect(() => {
        setFailedTryRegister(false);
    }, [username, password]);
    
    return (
        <main className="register">
            <form className="formRegister">
                <h1 className="titleRegister">Registro</h1>
                <label className="labelRegister" htmlFor="username-input">
                    <input
                        className="inputRegister"
                        type="text"
                        name="username"
                        value={ username }
                        onChange={ (event) => handleChange(event) }
                        placeholder="Username"
                    />
                </label>
                <label className="labelRegister" htmlFor="password-input">
                    <div className="password">
                        <input
                            className="inputRegisterPassword"
                            type="password"
                            name="password"
                            value={ password }
                            onChange={ (event) => handleChange(event) }
                            placeholder="Password"
                        />
                        { !visibility ? <FaEye className="eye" onClick={ show } /> : <FaEyeSlash className="eye" onClick={ dontshow } /> }
                    </div>
                </label>
                <button
                    className="buttonRegister"
                    type="submit"
                    onClick={ (event) => register(event) }
                    disabled={ disabled }
                >
                    Cadastro
                </button>
                <Link to="/login">
                <button
                    type="button"
                    className="buttonLoginInRegister"
                    >
                    Clique aqui para fazer Login
                </button>
            </Link>
            {
                (failedTryRegister)
                    ? (
                        <p className="errors">
                            {
                            `Username ou senha inválidos.
                            Por favor, tente novamente.`
                            }  
                        </p>
                    )
                    : null
            }
            {
                (registred)
                ? (
                    <p className="success">
                        Usuário criado com sucesso!
                    </p>
                ) : null
            }
            </form>
        </main>
    )
}

export default Register;