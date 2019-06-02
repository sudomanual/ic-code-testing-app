import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'
import exjwt from 'express-jwt'
import User from './models/User'
import Validator from 'node-input-validator'
import dbCredentials from './credentials/db'
import { secret, expiresIn } from './credentials/auth'
import { authGuard, encrypt } from './actions'
import { authGuard, encrypt } from './actions'

// Setting up Express.js server
const app = express()
app.use(cors())
app.use(bodyParser.json())
// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization')
    next()
})

// INegotiating the express-jwt middleware
exjwt({ secret } )

// Postgres Client Setup
const db = new Pool(dbCredentials)

db.on('error', () => console.log('connection error!'))
User(db).up()

// Express route handlers
app.get('/', (req, res) => {
    res.send('Server is running...')
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    // Use your DB ORM logic here to find user and compare password
    const rows = await User(db).authCheck(username, encrypt(password))
    if( typeof rows == "undefined" || rows.length == 0 ) {
        res.status(401).json({
            success: false,
            token: null,
            message: 'Username or password is incorrect'
        })
        return
    }

    let user = rows[0];
    // If all credentials are correct do this
    let token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn }) // Signing the token
    res.json({
        success: true,
        message: 'Successfully user signed in!',
        user,
        token
    })
});

// Register route
app.put('/user', async (req, res) => {
    const { username, password } = req.body

    let validator = new Validator( req.body, {
        username:'required|minLength:2|maxLength:30',
        password: 'required|minLength:6|maxLength:25'
    })
    if( ! await validator.check()) {
        res.status(422).json(validator.errors);
        return
    }
    let result = await User(db).insert(username, encrypt(password))
    if(typeof result == "undefined" || result.rowCount == 0) {
        res.status(401).json({
            success: false,
            message: "Unable to added new user, please make sure you haven't added this username before!"
        })
        return
    }
    res.json({
        success: true,
        message: 'Successfully added new user!'
    })
});

// Gets user and check for valid token
app.patch('/user', authGuard, async (req, res) => {
    const { id } = req.decoded
    res.json({
        success: true,
        message: 'Successfully fetched authorized user information!',
        user: await User(db).find(id)
    })
});

// Error handling
app.use( (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // Send the error rather than to show it on the console
        res.status(401).send(err)
    }
    else {
        next(err)
    }
});

app.listen(3000, err => {
    console.log('Listening')
});
