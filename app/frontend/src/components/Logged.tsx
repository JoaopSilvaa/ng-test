import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestData, sendData } from '../services/requests';

const Logged = (user: any) => {
    const [thisUser, setThisUser] = useState({});
    const [balance, setBalance] = useState({});
    const [cashes, setCashes] = useState([]);
    const [filter, setFilter] = useState('all');
    const [value, setValue] = useState('');
    const [creditedAccountUser, setCreditedAccountUser] = useState('');
    const [failedTryTransfer, setFailedTryTransfer] = useState(false);

    useEffect(() => {
        const renderData = async () => {
            setThisUser(JSON.parse(user));
            const usuario = JSON.parse(user);
            setBalance( await requestData(`/users/balance/${usuario.id}`));
            setCashes(await requestData('/transactions'));
        };
        renderData();
        }, [user]);
    
    const handleFilter = async () => {
        const selectedFilter = (document.getElementById('filter') as HTMLInputElement).value;
        setFilter(selectedFilter);
        if (filter === 'all') {
            setCashes(await requestData('/transactions'));
        } else if (filter === 'cash-in') {
            setCashes(await requestData('transactions/cash-in'));
        } else if (filter === 'cash-out') {
            setCashes(await requestData('transactions/cash-out'));
        } else if (filter === 'data') {
            setCashes(await requestData('transactions/bydate'));
        }
    }

    const transfer = async (event: any) => {
        event.preventDefault();

        try {
            await sendData('/transactions', { creditedAccountUser, value });
            alert('Transação realizada com sucesso');
            setFailedTryTransfer(false);
        } catch (error){
            setFailedTryTransfer(true);
        }
    }

    // const handleUser = async (accountId: number) => {
    //     const { username } = await requestData(`/users/${accountId}`);
    //     return <span>{username}</span>;
    // }

    return (
        <main>  
            <header>
                <p>
                    {
                        `Olá, ${thisUser}!`
                    }
                </p>
                <p>
                    {
                        `Seu balance é de: ${balance}`
                    }
                </p>
                <Link to="/login">
                    <button
                        type="button"
                        >
                        Logout
                    </button>
                </Link>
            </header>
            <section>
                <form>
                    <h1>Realize uma transferência agora:</h1>
                    <label>
                        Valor:
                        <input 
                            type="text"
                            onChange={ ({ target: { value } }) => setValue(value) }
                            placeholder="Valor"
                        />
                    </label>    
                    <label>
                        Usuário que receberá a transferência:
                        <input 
                            type="text"
                            onChange={ ({ target: { value } }) => setCreditedAccountUser(value) }
                            placeholder="Username"
                        />
                    </label>
                    <button
                        type="submit"
                        onClick={ (event) => transfer(event) }
                    >
                        Transferir
                    </button>
                    {
                        (failedTryTransfer)
                        ? (
                            <p>
                                {
                                    `Usuário ou valor inválido`
                                }
                            </p>
                        ) : null
                    }
                </form>
            </section>
            <section>
                <h1>Tabela com suas transações:</h1>
                <label>
                    <select
                        id="filter"
                    >
                        <option>all</option>
                        <option>data</option>
                        <option>cash-in</option>
                        <option>cash-out</option>
                    </select>
                    <button
                        type="button"
                        onClick={ () => handleFilter() }
                    >
                        Filtrar
                    </button>
                </label>
                <table>
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
                                        <td>{ value }</td>
                                        <td>{ createdAt }</td>
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