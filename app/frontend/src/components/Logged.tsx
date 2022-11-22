import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestData, sendData } from '../services/requests';
import './Logged.css';

const Logged = ({ user }: any) => {
    const [thisUsername, setThisUsername] = useState('');
    const [thisId, setThisId] = useState('');
    const [balance, setBalance] = useState();
    const [cashes, setCashes] = useState([]);
    const [value, setValue] = useState('');
    const [creditedAccountUser, setCreditedAccountUser] = useState('');
    const [failedTryTransfer, setFailedTryTransfer] = useState(false);

    const formatData = (date: string) => {
        const four = 4;
        const eight = 8;
        const day = date.substr(eight, 2);
        const year = date.substr(0, four);
        const month = date.substr(four + 1, 2);
        return `${day}/${month}/${year}`;
      };

    useEffect(() => {
        const renderData = async () => {
            const usuario = JSON.parse(user); 
            setThisUsername(usuario.username);
            setThisId(usuario.id);
            const { balance } = await requestData(`/users/balance/${usuario.id}`);
            setBalance(balance);
            setCashes(await requestData('/transactions'));   
        };
        renderData();
    }, [user]);
    
    useEffect(() => {
        async function getCashes() {
            handleFilter();
            if (thisId !== '') {
                const { balance } = await requestData(`/users/balance/${thisId}`);
                setBalance(balance);
            }
        }
        getCashes();
    });

    const handleFilter = async () => {
        const filter = (document.getElementById('filter') as HTMLInputElement).value;
        if (filter === 'all') {
            const cashes = await requestData('/transactions')
            setCashes(cashes);
        } else if (filter === 'cash-in') {
            const cashes = await requestData('transactions/cash-in')
            setCashes(cashes);
        } else if (filter === 'cash-out') {
            const cashes = await requestData('transactions/cash-out')
            setCashes(cashes);
        } else if (filter === 'data') {
            const cashes = await requestData('transactions/bydate')
            setCashes(cashes);
        }
    }

    const transfer = async (event: any) => {
        event.preventDefault();

        try {
            const valor = Number(value);
            await sendData('/transactions', { creditedAccountUser, value: valor });
            alert('Transação realizada com sucesso');
            setFailedTryTransfer(false);
        } catch (error){
            setFailedTryTransfer(true);
            setTimeout(() => setFailedTryTransfer(false), 3000);
        }
    }

    return (
        <main className='logged'>  
            <header className='header'>
                <p>
                    {
                        `Olá, ${thisUsername}!`
                    }
                </p>
                <p>
                    {
                        `Seu balance é de: R$ ${balance}`
                    }
                </p>
                <Link to="/login">
                    <button
                        className="buttonLogout"
                        type="button"
                        onClick={ () => localStorage.clear() }
                        >
                        Logout
                    </button>
                </Link>
            </header>
            <section className='transfers'>
                <form className='transfers-form'>
                    <h1>Realize uma transferência agora:</h1>
                    <label htmlFor="valor-input">
                        Valor:
                        <input
                            className='inputTransfer' 
                            type="text"
                            onChange={ ({ target: { value } }) => setValue(value) }
                            placeholder="Valor"
                        />
                    </label>    
                    <label htmlFor="username-input">
                        Usuário:
                        <input
                            className='inputTransfer' 
                            type="text"
                            onChange={ ({ target: { value } }) => setCreditedAccountUser(value) }
                            placeholder="Username"
                        />
                    </label>
                    <button
                        className="buttonTransfer"
                        type="submit"
                        onClick={ (event) => transfer(event) }
                    >
                        Transferir
                    </button>
                    {
                        (failedTryTransfer)
                        ? (
                            <p className="errorTransfer">
                                {
                                    `Usuário ou valor inválido`
                                }
                            </p>
                        ) : null
                    }
                </form>
            </section>
            <section className='transactions'>
                <div className='topTable'>
                    <h1>Transações:</h1>
                    <label>
                        Selecione um filtro:
                        <select
                            className='selections'
                            id='filter'
                        >
                            <option>all</option>
                            <option>data</option>
                            <option>cash-in</option>
                            <option>cash-out</option>
                        </select>
                    </label>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Conta debitada</th>
                            <th>Conta creditada</th>
                            <th>Valor</th>
                            <th>Data da Transação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cashes
                                .map(({
                                    id,
                                    debitedAccountId,
                                    creditedAccountId,
                                    value,
                                    createdAt,
                                }) =>(
                                    <tr key={id}>
                                        <td>{ id }</td>
                                        <td>{ debitedAccountId }</td>
                                        <td>{ creditedAccountId }</td>
                                        <td>R$ { value }</td>
                                        <td>{ formatData(createdAt) }</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Logged;