import React, { useState } from 'react'

import './Agendamento.css'

function Agendamento(props) {
    const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = props
    
    const [expandir, setExpandir] = useState(false)

    function switchExpandir(e) {
        e.preventDefault()
        
        setExpandir(!expandir)
    }

    return(
        <div className="agendamento-container">
            <form>
                <div className="dados-principais">
                    <button onClick={ switchExpandir }>></button>
                    <label id="nome-cliente">Cliente</label>
                    <input id="nome-cliente" value={ nomeCliente } disabled></input>

                    <label id="pet">Pet</label>
                    <input id="pet" value={ nomeCachorro } disabled></input>

                    <p>Data</p>
                    <input id="dia" value={ dia } disabled></input>
                    <input id="mes" value={ mes } disabled></input>
                    <input id="ano" value={ ano } disabled></input>

                    <p>Horário</p>
                    <input id="hora" value={ hora } disabled></input>
                    <input id="minuto" value={ minuto } disabled></input>
                </div>
                <div className="dados-secundarios">
                    { expandir && (
                        <>
                            <label id="observacoes">Observações</label>
                            <input id="observacoes" value={ obs } disabled></input>

                            <label id="telefone">Telefone</label>
                            <input id="telefone" value={ telefone } disabled></input>
                        </>
                    ) }
                </div>

            </form>
        </div>
    )
}

export default Agendamento