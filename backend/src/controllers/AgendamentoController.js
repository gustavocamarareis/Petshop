const Agendamento = require('../models/Agendamento')

module.exports = {
    async store(req, res){
        const { dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone } = req.body

        const agendamento = await Agendamento.create ({ dia, mes, ano, hora, minuto, nomeCliente, nomeCachorro, obs, telefone })
        
        return res.json (agendamento)
    }
}
