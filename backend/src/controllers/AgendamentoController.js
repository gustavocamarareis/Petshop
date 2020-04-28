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
    },

    async list(req, res){
        let agendamento
        const { dia, mes, ano } = req.body
        console.log(req.body)

        if(!dia && !mes){
             agendamento = await Agendamento.find({ ano })
        }
        if(mes && !dia){
             agendamento = await Agendamento.find({mes, ano})
        }
        if(mes && dia){
             agendamento = await Agendamento.find({dia, mes, ano})
        }

        if(!agendamento) {
            agendamento = []
        }
        console.log(agendamento)
        return res.json(agendamento)
    },

    async delete(req, res){
        const agendamento_id = req.body._id

        await Agendamento.deleteOne({ _id: `${agendamento_id}` })

        return res.json ({ mensagem: "O agendamento foi cancelado"})
    }
}
