const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

// Helpers
const createUserToken = require('../helpers/create-user-token')
const getUserToken = require('../helpers/get-user-token')
const { imageUpload } = require('../helpers/image-upload')

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

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(422).json({ message: 'Este e-mail já está cadastrado!' })
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
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch (error) {
            console.log('ERRO: ' + error)
            res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário!' })
            return
        }

    }

    static async login(req, res) {

        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message : 'O campo email é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message : 'O campo password é obrigatório!' })
            return
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(422).json({ message: 'E-mail não cadastrado!' })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha inválida!' })
            return
        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req, res) {

        let currentUser

        if (req.headers.authorization) {
            const token = getUserToken(req)
            const decodedToken = jwt.verify(token, 'nossachave')

            currentUser = await User.findById(decodedToken.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).json(currentUser)

    }

    static async getUserById(req, res) {

        const id = req.params.id

        if (!id) {
            res.status(422).json({ message: 'O campo id não foi informado!' })
            return
        }

        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(user)

    }

    static async editUser(req, res) {

        const { name, email, phone, password, confirmPassword } = req.body
        let image

        if (req.params.id !== req.user.id) {
            res.status(422).json({ message: 'Usuário inválido!' })
            return
        }

        const currentUser = await User.findById(req.user.id)

        if (!currentUser) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        if (req.file) {
            image = req.file.filename

            await fs.unlink(`public/images/users/${currentUser.image}`, (err) => console.log(err) )
        }

        if (!email) {
            res.status(422).json({ message : 'O campo email é obrigatório!' })
            return
        }
        const emailExists = await User.findOne({ email })

        if (email !== currentUser.email && emailExists) {
            res.status(422).json({ message: 'E-Mail já existente!' })
            return
        }

        if (!name) {
            res.status(422).json({ message : 'O campo name é obrigatório!' })
            return
        }

        if (!phone) {
            res.status(422).json({ message : 'O campo phone é obrigatório!' })
            return
        }

        if (password !== confirmPassword) {
            res.status(422).json({ message : 'Os campos password e confirmPassword precisam ser idênticos!' })
            return
        }

        let newPassword = undefined

        if (password != null) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            newPassword = passwordHash
        }

        try {
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                { name, email, password: newPassword, phone, image },
                { new: true }
            )

            res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ocorreu um erro!' })
        }

    }

}