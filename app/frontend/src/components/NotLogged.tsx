import React from 'react';
import { Link } from 'react-router-dom';
import './NotLogged.css';

const NotLogged = () => {
    return (
        <main className="NotLogged"> 
            <h1 className="titleHome">
                Faça o seu cadastro e/ou login para acessar as funcionalidades do sistema
            </h1>
            <div className="NotLoggedButtons">
                <Link to="/login">
                    <button
                        className="buttons"
                        type="button"
                        >
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button
                        type="button"
                        className="buttons"
                        >
                        Cadastre-se
                    </button>
                </Link>  
            </div>
        </main>
    )
}

export default NotLogged;