import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import Header from '../../components/Header/Header'
import Agendamento from '../../components/Agendamento/Agendamento'
import Button from '../../components/Button/Button'
import EditModal from '../../components/EditModal/EditModal'
import CreateModal from '../../components/CreateModal/CreateModal'
import AgendamentoSelecionadoModal from '../../components/AgendamentoSelecionadoModal/AgendamentoSelecionadoModal'

import './Agendamentos.css'
import { parseWithOptions } from 'date-fns/fp'

function Agendamentos(props) {
    const [agendamentos, setAgendamentos] = useState([])
    let iniciarDia
    let iniciarMes
    let iniciarAno

    if(props.dia && props.mes && props.ano) {
        iniciarDia = props.dia
        iniciarMes = props.mes
        iniciarAno = props.ano
    } else {
        iniciarDia = undefined
        iniciarMes = undefined
        iniciarAno = new Date().getFullYear()
    }
    const [ano, setAno] = useState(iniciarAno)
    const [mes, setMes] = useState(iniciarMes)
    const [dia, setDia] = useState(iniciarDia)

    const [vetorAnos, setVetorAnos] = useState([]) 
    const [vetorMeses, setVetorMeses] = useState([])
    const [vetorDias, setVetorDias] = useState([])

    const [showEditModal, setShowEditModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showAgendamentoSelecionadoModal, setShowAgendamentoSelecionadoModal] = useState(false)


    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(undefined)

    useEffect( () => {
        async function verificarLogin() {
            let user_id = localStorage.getItem('user_id')
            
            const resposta = await api.get(`verificar?user_id=${user_id}`)
            if(!resposta.data.sucesso) {
                props.history.push('/')
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

            const agendamentosFixos = []
            let agendamentosNormais = []
            let agendamentosOrganizados = []

            resposta.data.map(agendamento => {
                if(agendamento.fixo) {
                    agendamentosFixos.push(agendamento)
                } else {
                    agendamentosNormais.push(agendamento)
                }
            })

            function compare(a, b){
                let data1 = new Date(a.ano, a.mes, a.dia);
                let data2 = new Date(b.ano, b.mes, b.dia);

                return data2 - data1;
            }

            agendamentosNormais = agendamentosNormais.slice().sort(compare);

            agendamentosOrganizados = [].concat(agendamentosFixos, agendamentosNormais)
            setAgendamentos(agendamentosOrganizados)
        }
        getAgendamentos()
    }, [ano, mes, dia])

    function mudarCor() {
        if(document.getElementsByClassName('calendar')[0]) {
            document.getElementsByClassName('calendar')[0].style.background = 'none'
        }
    }

    return(
        <>
            { showAgendamentoSelecionadoModal && (
                <AgendamentoSelecionadoModal
                    agendamentoSelecionado={ agendamentoSelecionado }
                    setShowEditModal={ setShowEditModal }
                    setShowAgendamentoSelecionadoModal={ setShowAgendamentoSelecionadoModal }
                />
            ) }

            { showEditModal && (
                <EditModal 
                    setShowModal={ setShowEditModal }
                    dia={ agendamentoSelecionado.dia }
                    mes={ agendamentoSelecionado.mes }
                    ano={ agendamentoSelecionado.ano }
                    hora={ agendamentoSelecionado.hora }
                    minuto={ agendamentoSelecionado.minuto }
                    nomeCliente={ agendamentoSelecionado.nomeCliente }
                    nomeCachorro={ agendamentoSelecionado.nomeCachorro }
                    cor={ agendamentoSelecionado.cor }
                    telefone={ agendamentoSelecionado.telefone }
                    obs={ agendamentoSelecionado.obs }
                    agendamento_id={ agendamentoSelecionado._id }
                    fixo={ agendamentoSelecionado.fixo }
                />
            ) }

            { showCreateModal && (
                <CreateModal 
                    setShowModal={ setShowCreateModal }
                />
            ) }
            { !props.noHeader && (
                <Header history={ props.history } />
            ) }
            { agendamentos.length == 0 && (
                <>
                    { true && mudarCor() }
                    <div 
                        style={{ width: '100vw', background: 'none', padding: '30px', display: 'flex', flexDirection: 'column' }}
                        className="new-button"
                    >
                        <h1 style={{ marginTop: '10%', justifyContent: 'center' }}>Não há agendamentos para essa data</h1>
                        <Button
                            className="create-modal-button"
                            text="Criar novo agendamento"
                            style={{ width: '20%', height: '40px', marginTop: '5%' }}
                            onClick={ () => {
                                setShowCreateModal(true)
                            } }   
                        ></Button>
                        <Button
                            className="create-modal-button"
                            text="Voltar"
                            style={{ width: '20%', height: '40px', marginTop: '1%' }}
                            onClick={ () => {
                                window.location.reload(false); 
                            } }   
                        ></Button>
                    </div>
                </>
            ) }
            { agendamentos.length > 0 && (
                <div 
                    style={{ width: '100vw', background: 'white', padding: '30px' }}
                    className="new-button"
                >
                <Button
                    className="create-modal-button"
                    text="Criar novo agendamento "
                    style={{ width: '20%', height: '40px' }}
                    onClick={ () => {
                        setShowCreateModal(true)
                    } }   
                ></Button>
                </div>
            ) }
            { agendamentos.length > 0 && (
                <div style={{ margin: '0 !important' }} className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100">
                                <section className="container">
                                    { !props.dia && (
                                        <>
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
                                        </>
                                    ) }
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
                                            <th className="column7">Dia Fixo</th>
                                        </tr>
                                    </thead>
                                    { agendamentos.map( agendamento => {
                                        const { fixo, dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone, cor, _id } = agendamento
                                        return (
                                            <Agendamento
                                                id="myBtn"
                                                _id={ _id }
                                                dia={ dia }
                                                mes={ mes }
                                                ano={ ano }
                                                hora={ hora }
                                                minuto={ minuto }
                                                nomeCliente={ nomeCliente }
                                                nomeCachorro={ nomeCachorro }
                                                obs={ obs }
                                                telefone={ telefone }
                                                cor={ cor }
                                                fixo={ fixo }
                                                onClick={ () => {
                                                    setShowAgendamentoSelecionadoModal(true)
                                                    setAgendamentoSelecionado(agendamento);
                                                } }
                                            />
                                        )
                                    } ) }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) }
        </>
    )
}

export default Agendamentos