import React from 'react';
import { Link } from 'react-router-dom';

const NotLogged = () => {
    return (
        <main> 
            <header>
                <Link to="/login">
                    <button
                        type="button"
                        >
                        Login
                    </button>
                </Link>
            </header>
            <section>
                <h1>
                    Faça o Login para acessar as funcionalidades do sistema
                </h1>
            </section>
        </main>
    )
}

export default NotLogged;