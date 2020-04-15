import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import Header from '../../components/Header/Header'

function Agendamentos({ history }) {
    useEffect( () => {
        let user_id = localStorage.getItem('user_id')
        if(user_id === null || (user_id !== '' && ! user_id.length >= 1) ) {
            localStorage.setItem('user_id', '')
            history.push('/')
        }
    }, [] )

    const [ano, setAno] = useState(new Date().getFullYear())
    const [mes, setMes] = useState(undefined)
    const [dia, setDia] = useState(undefined)

    /*
    useEffect(() => {
        const resposta = await api.post('/listar', {

        })
    }, [])
    */

    return(
        <>
            <Header history={ history } />
        </>
    )
}

export default Agendamentos