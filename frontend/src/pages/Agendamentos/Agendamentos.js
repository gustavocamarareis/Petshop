import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import Header from '../../components/Header/Header'
import Agendamento from '../../components/Agendamento/Agendamento'
import Button from '../../components/Button/Button'
import EditModal from '../../components/EditModal/EditModal'
import CreateModal from '../../components/CreateModal/CreateModal'

import './Agendamentos.css'

function Agendamentos({ history }) {
    const [agendamentos, setAgendamentos] = useState([])

    const [ano, setAno] = useState(new Date().getFullYear())
    const [mes, setMes] = useState(undefined)
    const [dia, setDia] = useState(undefined)

    const [vetorAnos, setVetorAnos] = useState([]) 
    const [vetorMeses, setVetorMeses] = useState([])
    const [vetorDias, setVetorDias] = useState([])

    const [showEditModal, setShowEditModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)


    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(undefined)

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
    
        /* configura     o modal */
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
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
            <Header history={ history } />
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
            <div style={{ margin: '0 !important' }} className="limiter">
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
                                        <th className="column7">Dia Fixo</th>
                                    </tr>
                                </thead>
                                { agendamentos.map( agendamento => {
                                    const { fixo, dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone, cor, _id } = agendamento
                                    return (
                                        <Agendamento
                                            id="myBtn"
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
                                                var modal = document.getElementById("myModal");
                                                modal.style.display = "block";
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
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <Button
                        className="modal-button"
                        text="Editar"
                        style={{ width: '50%', height: '30px' }}
                        onClick={ () => {
                            var modal = document.getElementById("myModal");
                            modal.style.display = "none";
                            setShowEditModal(true)
                        } }
                    ></Button>
                    <Button 
                        className="modal-button"
                        text="Deletar"
                        style={{ width: '50%', height: '30px' }}
                        onClick={ () => {
                            async function deletarAgendamento() {
                                if(window.confirm('Tem certeza que deseja deletar esse agendamento?')) {
                                    await api.post('/cancelar', { _id: agendamentoSelecionado._id })
                                    window.location.reload(false); 
                                }
                            }
                            
                            deletarAgendamento()
                        } }
                    ></Button>
                </div>
            </div>
        </>
    )
}

export default Agendamentos