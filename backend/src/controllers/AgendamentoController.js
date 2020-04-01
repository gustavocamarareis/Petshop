const Agendamento = require('../models/Agendamento')

module.exports = {
    async store(req, res){
        const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = req.body

        const agendamento = await Agendamento.create ({ dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone })
        
        return res.json (agendamento)
    },
    async edit(req, res){    
        const { agendamento_id } = req.query
        const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = req.body
    
        await Agendamento.updateOne ({ _id: agendamento_id}, { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone })
        let agendamento = await Agendamento.findOne ({ _id: agendamento_id })

        return res.json (agendamento)
    }
}
