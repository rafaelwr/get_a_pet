const ObjectId = require('mongoose').Types.ObjectId

const Pet = require('../models/Pet')
const User = require('../models/User')

module.exports = class {

    static async getAll(req, res) {

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets })

    }

    static async getAllByUser(req, res) {

        const pets = await Pet.find({ 'user._id': req.user.id }).sort('-createdAt')

        res.status(200).json({ pets })

    }

    static async getAllByAdopter(req, res) {

        const pets = await Pet.find({ 'adopter._id': req.user.id }).sort('-createdAt')

        res.status(200).json({ pets })

    }
    
    static async getById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'O parâmetro id é obrigatório!' })
            return
        }

        const pet = await Pet.findById(id)

        if (!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        res.status(200).json({ pet })

    }

    static async deleteById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id inválido!' })
            return
        }

        const pet = await Pet.findById(id)

        if (!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        if (pet.user._id.toString() !== req.user.id) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

        try {
            await Pet.findByIdAndDelete(id)

            res.status(200).json({ message: 'Pet removido com sucesso!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ocorreu um erro!' })
        }

    }

    static async create(req, res) {
        
        const { name, age, weight, color } = req.body
        const available = true

        const imagens = req.files

        if (!name) {
            res.status(422).json({ message: 'O campo name é obrigatório!' })
            return
        }

        if (!age) {
            res.status(422).json({ message: 'O campo age é obrigatório!' })
            return
        }

        if (!weight) {
            res.status(422).json({ message: 'O campo weight é obrigatório!' })
            return
        }

        if (!color) {
            res.status(422).json({ message: 'O campo color é obrigatório!' })
            return
        }

        if (imagens.length === 0) {
            res.status(422).json({ message: 'O campo images é obrigatório!' })
            return
        }

        const user = await User.findById(req.user.id)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        await imagens.map((image) => pet.images.push(image.filename))

        try {
            const newPet = await pet.save()

            res.status(201).json({ 
                message: 'Pet cadastrado com sucesso!',
                newPet
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ocorreu um erro!' })
        }

    }

}