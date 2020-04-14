const md5 = require('md5')
const Usuario = require('../models/Usuario')

module.exports = {
    async store(req, res){
        const { usuario, senha } = req.body

        let user = await Usuario.findOne({ usuario })

        if(user) {
            return res.json({ mensagem: "Usuário já existe"})
        }

        senha_escondida = md5(`${senha}${usuario}bolinho10`)
        user = await Usuario.create({ usuario: usuario, senha: senha_escondida })

        return res.json(user)
    },

    async index(req, res){
        const { usuario, senha } = req.body
        
        let user = await Usuario.findOne({ usuario })
        if (!user) {
            return res.json({ sucesso: false })
        }

        senha_escondida = md5(`${senha}${usuario}bolinho10`)
        if (user.senha == senha_escondida){
            return res.json({ sucesso: true })
        }
        console.log('a')
        return res.json({ sucesso: false })

    }
}