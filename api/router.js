const {
    generateIndex,
    generateHome,
    generateMain,
    getInputLateX,
    getOutputLateX,
    getPDF,
    authentication,
    registerFunc,
    generateLogin
} = require('./controller')
const router = require('express').Router()

router.get('/', generateIndex)
router.get('/home', generateHome)
router.get('/main', generateMain)
router.get('/download', getOutputLateX)
router.post('/compile', getInputLateX)
router.get('/compile/input.pdf', getPDF)
router.get('/login', generateLogin)
router.post('/auth', authentication)
router.post('/register',registerFunc)

module.exports = router