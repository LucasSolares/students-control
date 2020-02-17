const express = require('express')
const router = express.Router()
const response = require('../../network/response')

const Secure = require('./secure')
const Controller = require('./controller')

router.post('/register', async (req, res) => {

    const {username, password, email, name, lastName} = req.body
    try {
        const newUser = await Controller.addUser(username, password, email, name, lastName)
        response.success(res, newUser)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }

})

router.put('/', Secure.checkAuth('update'), async (req, res) => {
    const {username, password, email, name, lastName} = req.body
    try {
        const userUpdated = await Controller.updateUser(username, password, email, name, lastName)
        response.success(res, userUpdated)
    } catch (error) {
        console.error(error)
        response.error(res, error.code)
    }
})

module.exports = router