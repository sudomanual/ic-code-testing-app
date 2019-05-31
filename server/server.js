import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Pool } from 'pg'
import dbCredentials from './constants/db'

// Setting up Express.js server
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
const db = new Pool(dbCredentials)

db.on('error', () => console.log('connection error'))

db.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err))

// Express route handlers
app.get('/', (req, res) => {
    res.send('Server is running..')
})

app.listen(3000, err => {
    console.log('Listening')
});
