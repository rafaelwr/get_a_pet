const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = class UserController {

    static async register(req, res) {
        
        const { name, email, phone, password, confirmPassword } = req.body

        if (!name) {
            res.status(422).json({ message : 'O campo name é obrigatório!' })
            return
        }

        if (!email) {
            res.status(422).json({ message : 'O campo email é obrigatório!' })
            return
        }

        if (!phone) {
            res.status(422).json({ message : 'O campo phone é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message : 'O campo password é obrigatório!' })
            return
        }

        if (!confirmPassword) {
            res.status(422).json({ message : 'O campo confirmPassword é obrigatório!' })
            return
        }

        if (password !== confirmPassword) {
            res.status(422).json({ message : 'Os campos password e confirmPassword precisam ser idênticos!' })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            await user.save()
            res.status(201).json({ message: 'Usuário registrado com sucesso!' })
        } catch (error) {
            console.log('ERRO: ' + error)
            res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário!' })
            return
        }

    }

}