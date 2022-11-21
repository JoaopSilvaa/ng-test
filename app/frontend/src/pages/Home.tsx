import React, { useState, useEffect } from 'react';
import Logged from '../components/Logged';
import NotLogged from '../components/NotLogged';

const Home = () => {
    const [user, setUser] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const data = localStorage.getItem('user');
        if (token && data) {
            setUser(data);
        } else {
            setUser('');
        }
    }, []);
    
    return (
        <main>
            { (user !== '') ? <Logged user={user}/> : <NotLogged /> }
        </main>
    )
}

export default Home;