import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestData, sendData } from '../services/requests';

const Transfer = (user: any) => {
    const [value, setValue] = useState('');
    const [creditedAccountUser, setCreditedAccountUser] = useState('');
    const [failedTryTransfer, setFailedTryTransfer] = useState(false);
    return (
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
    );
}

export default Transfer;
