import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import route from './routes/routes.js'
import session from 'express-session'
// import PositionSeeder from './seeders/PositionSeeder.js';
// import UserSeeder from './seeders/UserSeeder.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT
const SECRET_SESSION = process.env.SECRET_SESSION

// Database connect
mongoose.connect('mongodb://127.0.0.1:27017/employes_api')
.then(() => {
    // PositionSeeder()
    // UserSeeder()
    console.log('database connected')
}).catch(error => console.error(error))

// Route root
app.get('/', (req, res) => res.status(200).json('Employes API'))

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}))
app.use('/api', route)

// server connect
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))