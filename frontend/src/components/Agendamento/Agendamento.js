import React from 'react'

import './Agendamento.css'

function Agendamento(props) {
    const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone, onClick } = props

    return(
        <tbody>
            <tr onClick={ onClick }>
                <td className="column1">{ nomeCliente }</td>
                <td className="column2">{ nomeCachorro }</td>
                <td className="column3">{ `${ dia }/${ mes }/${ ano }` }</td>
                <td className="column4">{ `${ hora }:${ minuto }` }</td>
                <td className="column5">{ obs }</td>
                <td className="column6">{ telefone }</td>
            </tr>
        </tbody>
    )
}

export default Agendamento