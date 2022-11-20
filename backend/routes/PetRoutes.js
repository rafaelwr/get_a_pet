const router = require('express').Router()

const PetController = require('../controllers/PetController')

// Hepers
const verifyUserToken = require('../helpers/verify-user-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/create', verifyUserToken, imageUpload.array('images'), PetController.create)
router.get('/mypets', verifyUserToken, PetController.getAllByUser)
router.get('/', PetController.getAll)

module.exports = router