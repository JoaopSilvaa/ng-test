import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { sendData, setToken } from '../services/requests';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [failedTryLogin, setFailedTryLogin] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const login = async (event: any) => {
        event.preventDefault();

        try {
            const { token } = await sendData('/users/login', { username, password });
            const data = await sendData('/users/user', { username });
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data));
            setIsLogged('true');
        } catch (error){
            setFailedTryLogin(true);
            setTimeout(() => setFailedTryLogin(false), 3000);
            setIsLogged('false');
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

    useEffect(() => {
        setFailedTryLogin(false);
    }, [username, password]);

    if (isLogged === 'true') return <Navigate to="/" />;
    
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

    return (
        <main className="login">
            <form className="formLogin">
                <h1 className="titleLogin">Login</h1>
                <label className="labelLogin" htmlFor="username-input">
                    <input
                        className="inputLogin"
                        type="text"
                        name="username"
                        value={ username }
                        onChange={ (event) => handleChange(event) }
                        placeholder="Username"
                    />
                </label>
                <label className="labelLogin" htmlFor="password-input">
                    <div className="password">
                        <input
                            className="inputLoginPassword"
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
                    className="buttonLogin"
                    type="submit"
                    onClick={ (event) => login(event) }
                    disabled={ disabled }
                >
                    Login
                </button>
                <Link to="/register">
                    <button
                        className="buttonRegisterInLogin"
                        type="button"
                        >
                        Clique aqui para registrar-se
                    </button>
                </Link>
                {
                    (failedTryLogin)
                        ? (
                            <p className="errors">
                                {
                                `O username ou a senha não estão corretos.
                                Por favor, tente novamente.`
                                }  
                            </p>
                        )
                        : null
                }
            </form>
        </main>
    )
}

export default Login;
