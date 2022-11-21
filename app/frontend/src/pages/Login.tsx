import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { sendData, setToken } from '../services/requests';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState('');
    const [failedTryLogin, setFailedTryLogin] = useState(false);

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
            setIsLogged('false');
        }
    }

    useEffect(() => {
        setFailedTryLogin(false);
    }, [username, password]);

    if (isLogged === 'true') return <Navigate to="/" />;
    
    return (
        <main>
            <header>
                <Link to="/register">
                    <button
                        type="button"
                        >
                        Clique aqui para registrar-se
                    </button>
                </Link>
            </header>
            <section>
                <form>
                    <h1>Login</h1>
                    <label htmlFor="username-input">
                        <input
                            type="text"
                            value={ username }
                            onChange={ ({ target: { value } }) => setUsername(value) }
                            placeholder="Username"
                        />
                    </label>
                    <label htmlFor="password-input">
                        <input
                            type="password"
                            value={ password }
                            onChange={ ({ target: { value } }) => setPassword(value) }
                            placeholder="Password"
                        />
                    </label>
                    {
                        (failedTryLogin)
                            ? (
                                <p>
                                  {
                                    `O username ou a senha não estão corretos.
                                    Por favor, tente novamente.`
                                  }  
                                </p>
                            )
                            : null
                    }
                    <button
                        type="submit"
                        onClick={ (event) => login(event) }
                    >
                        Login
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Login;
