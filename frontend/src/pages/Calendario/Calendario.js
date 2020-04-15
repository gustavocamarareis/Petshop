import React, { useEffect } from 'react'

import CalendarioComponent from '../../components/Calendario/Calendario'
import Header from '../../components/Header/Header'

function Calendario({ history }) {
    useEffect( () => {
        let user_id = localStorage.getItem('user_id')
        if(user_id === null || (user_id !== '' && ! user_id.length >= 1) ) {
            localStorage.setItem('user_id', '')
            history.push('/')
        }
    }, [] )

    return(
        <>
            <Header history={ history } />
            <CalendarioComponent />
        </>
    )
}

export default Calendario