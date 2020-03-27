const {
    compileLateX,
    downloadLateX,
    displayLateX,
    auth,
    register
} = require('./service')
const path = require('path')

const generateIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../templates', 'main.html'))
    return
}

const generateRegister = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../templates','register.html'))
    return
}

const registerFunc = (req, res) => {
    register(req,res, (error) => {
        if (error) {
            console.log(error)
            return
        }
    })
}

const generateLogin = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../templates', 'login.html'))
    return
}

const authentication = (req, res) => {
    auth(req, res, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
    return
}
const getInputLateX = (req, res) => {
    compileLateX(req.body.edit_body, req.session.username, res, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
    return
}

const getOutputLateX = (req, res) => {
    downloadLateX(res, req.session.username, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
}

const getPDF = (req,res) => {
    displayLateX(res, req.session.username, (error) => {
        if (error) {
            console.error(error)
            return
        }
    })
}

module.exports = {
    generateIndex,
    getInputLateX,
    getOutputLateX,
    getPDF,
    authentication,
    generateLogin,
    generateRegister,
    registerFunc
}