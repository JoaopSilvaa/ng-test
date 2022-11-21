import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sendData } from '../services/requests';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [failedTryRegister, setFailedTryRegister] = useState(false);
    const [registred, setRegistred] = useState(false);

    const register = async (event: any) => {
        event.preventDefault();

        try {
            const data = await sendData('/users', { username, password });
            localStorage.setItem('username', data);
            setRegistred(true);
            const time = setTimeout(() => setRegistred(false), 1000);
            clearTimeout(time);
        } catch (error){
            setFailedTryRegister(true);
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
        setFailedTryRegister(false);
    }, [username, password]);
    
    return (
        <main>
            <header>
                <Link to="/login">
                    <button
                        type="button"
                        >
                        Clique aqui para fazer Login
                    </button>
                </Link>
            </header>
            <section>
                <form>
                    <h1>Registro</h1>
                    <label htmlFor="username-input">
                        <input
                            type="text"
                            name="username"
                            value={ username }
                            onChange={ (event) => handleChange(event) }
                            placeholder="Username"
                        />
                    </label>
                    <label htmlFor="password-input">
                        <input
                            type="password"
                            name="password"
                            value={ password }
                            onChange={ (event) => handleChange(event) }
                            placeholder="Password"
                        />
                    </label>
                    {
                        (failedTryRegister)
                            ? (
                                <p>
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
                            <p>
                                Usuário criado com sucesso!
                            </p>
                        ) : null
                    }
                    <button
                        type="submit"
                        onClick={ (event) => register(event) }
                        disabled={ disabled }
                    >
                        Cadastro
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Register;