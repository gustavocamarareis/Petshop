import React, { useState, useEffect } from 'react'

import './Agendamento.css'

function Agendamento(props) {
    const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone, onClick, cor, fixo } = props
    const [diaFixo, setDiaFixo] = useState('')

    useEffect(() => {
        
        if(fixo) {
            const today = Date.parse(`${ ano }/${ mes }/${ dia }`);
            const date = new Date(today)
            var weekday = new Array(7);
            weekday[0] = "Domingo";
            weekday[1] = "Segunda";
            weekday[2] = "Terça";
            weekday[3] = "Quarta";
            weekday[4] = "Quinta";
            weekday[5] = "Sexta";
            weekday[6] = "Sábado";
          
            setDiaFixo(weekday[date .getDay()]);
        }
    })

    return(
        <tbody>
            <tr className="linha-tabela" style={{ backgroundColor: cor }} onClick={ onClick }>
                <td className="column1">{ nomeCliente }</td>
                <td className="column2">{ nomeCachorro }</td>
                { diaFixo && (
                    <td className="column3"></td>
                ) }
                { !diaFixo && (
                    <td className="column3">{ `${ dia }/${ mes }/${ ano }` }</td>
                ) }
                <td className="column4">{ `${ hora }:${ minuto }` }</td>
                <td className="column5">{ obs }</td>
                <td className="column6">{ telefone }</td>
                <td className="column7">{ diaFixo }</td>
            </tr>
        </tbody>
    )
}

export default Agendamento