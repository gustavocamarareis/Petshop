import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import Header from '../../components/Header/Header'
import Agendamento from '../../components/Agendamento/Agendamento'

import './Agendamentos.css'

function Agendamentos({ history }) {
    const [agendamentos, setAgendamentos] = useState([])
    
    const [ano, setAno] = useState(new Date().getFullYear())
    const [mes, setMes] = useState(undefined)
    const [dia, setDia] = useState(undefined)

    useEffect( () => {
        async function verificarLogin() {
            let user_id = localStorage.getItem('user_id')
            
            const resposta = await api.get(`verificar?user_id=${user_id}`)
            if(!resposta.data.sucesso) {
                history.push('/')
            }
        }

        verificarLogin()
    }, [] )

    useEffect(() => {
        async function getAgendamentos() {
            const resposta = await api.post('/listar', { ano, mes, dia })
            setAgendamentos(resposta.data)
        }

        getAgendamentos()
    }, [ano, mes, dia])

    return(
        <>
            <Header history={ history } />
            <div className="agendamentos-container">
                { agendamentos.map(agendamento => {
                    const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = agendamento
                    return(
                        <Agendamento 
                            dia={ dia }
                            mes={ mes } 
                            ano={ ano }
                            hora={ hora }
                            minuto={ minuto }
                            nomeCliente={ nomeCliente }
                            nomeCachorro={ nomeCachorro }
                            obs={ obs }
                            telefone={ telefone }
                        />
                    )
                }) }
            </div>
        </>
    )
}

export default Agendamentos