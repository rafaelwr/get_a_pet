const jwt = require('jsonwebtoken')
const getUserToken = require('./get-user-token')

const verifyUserToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    const token = getUserToken(req)

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const verifiedToken = jwt.verify(token, 'nossachave')

        req.user = verifiedToken
        next()
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' })
    }

}

module.exports = verifyUserToken