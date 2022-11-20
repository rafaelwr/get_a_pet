const express = require('express')
const cors = require('cors')

// Import DataBase
const db = require('./db/conn')

// Import Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

const app = express()

// Config JSON response
app.use(express.json())

// Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)