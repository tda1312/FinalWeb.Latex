const express = require('express')
const router = require('./api/router')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')


const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.use(express.static(path.join(__dirname, 'templates')))
app.use(express.urlencoded({ extended:true }))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/', router)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})