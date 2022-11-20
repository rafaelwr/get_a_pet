const router = require('express').Router()

const PetController = require('../controllers/PetController')

// Hepers
const verifyUserToken = require('../helpers/verify-user-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyUserToken, imageUpload.array('images'), PetController.create)

module.exports = router