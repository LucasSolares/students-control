const express = require('express')
const router = express.Router()
const response = require('../../network/response')

const Controller = require('./controller')

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const credential = await Controller.loginUser(email, password)
        response.success(res, credential)
    } catch (error) {
        console.error()
        response.error(res, error.code)
    }
})

module.exports = router