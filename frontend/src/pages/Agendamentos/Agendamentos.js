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

    const [vetorAnos, setVetorAnos] = useState([]) 
    const [vetorMeses, setVetorMeses] = useState([])
    const [vetorDias, setVetorDias] = useState([])

    useEffect( () => {
        async function verificarLogin() {
            let user_id = localStorage.getItem('user_id')
            
            const resposta = await api.get(`verificar?user_id=${user_id}`)
            if(!resposta.data.sucesso) {
                history.push('/')
            }
        }
        verificarLogin()

        let dias = []
        let meses = []
        let anos = []

        for(let i = 1; i <= 31; i++) {
            dias.push(i)
        }
        for(let i = 1; i <= 12; i++) {
            meses.push(i)
        }
        
        for(let i = new Date().getFullYear() ; i >= 2000; i--) {
            anos.push(i)
        }

        setVetorDias(dias)
        setVetorMeses(meses)
        setVetorAnos(anos)
    }, [])

    useEffect(() => {
        async function getAgendamentos() {
            let resposta
            let requestAno = ano
            let requestMes = mes
            let requestDia = dia

            if(dia && !mes) {
                requestMes = new Date().getMonth() + 1
            }

            if(!ano) {
                requestAno = new Date().getFullYear()
            }

            resposta = await api.post('/listar', { ano: requestAno, mes: requestMes, dia: requestDia })

            setAgendamentos(resposta.data)
        }
        getAgendamentos()
    }, [ano, mes, dia])

    return(
        <>
            <Header history={ history } />
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <section className="container">
                                <div className="dropdown">
                                    <select name="one" className="dropdown-select"
                                        onChange={ (e) => {
                                            setDia(parseInt(e.target.value))
                                        } }
                                    >
                                        <option value="">Selecione o dia</option>
                                        { true && (
                                            vetorDias.map( dia => {
                                                return (
                                                    <option value={ dia }>{ dia }</option>
                                                )
                                            } )
                                        ) }
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <select name="two" className="dropdown-select"
                                        onChange={ (e) => {
                                            setMes(parseInt(e.target.value))
                                        } }
                                    >
                                        <option value="">Selecione o mês</option>
                                        { true && (
                                            vetorMeses.map( mes => {
                                                return (
                                                    <option value={ mes }>{ mes }</option>
                                                )
                                            } )
                                        ) }
                                    </select>
                                </div>
                                <div className="dropdown">
                                    <select name="two" className="dropdown-select"
                                        onChange={ (e) => {
                                            setAno(parseInt(e.target.value))
                                        } }
                                    >
                                        <option value="">Selecione o ano</option>
                                        { true && (
                                            vetorAnos.map( ano => {
                                                return (
                                                    <option value={ ano }>{ ano }</option>
                                                )
                                            } )
                                        ) }
                                    </select>
                                </div>
                            </section>
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Cliente</th>
                                        <th className="column2">Nome do pet</th>
                                        <th className="column3">Data</th>
                                        <th className="column4">Horário</th>
                                        <th className="column5">Observações</th>
                                        <th className="column6">Telefone</th>
                                    </tr>
                                </thead>
                                { agendamentos.map( agendamento => {
                                    const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = agendamento

                                    return (
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
                                } ) }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agendamentos