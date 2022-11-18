const jwt = require('jsonwebtoken')

const createUserToken = (user, req, res) => {

    try {
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name
            }, 
            'nossachave'
        )
    
        res.status(200).json({ 
            message: 'Token criado com sucesso!',
            token: token,
            userId: user._id
        })
    } catch (error) {
        console.log('ERRO: ' + error)
        res.status(500).json({ message: 'Ocorreu um erro ao criar o token!' })
    }

}

module.exports = createUserToken