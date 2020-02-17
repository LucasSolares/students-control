const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../config')

async function encryptPassword(password) {

    return await bcrypt.hash(password, config.SALT)

}

async function comparePassword(passwordPlain, passwordEncrypted) {

    return await bcrypt.compare(passwordPlain, passwordEncrypted)

}

function generateAndSignToken(credential) {

    return jwt.sign(credential, config.SECRET)

}

function decodeToken(token) {
    try {
        const tokenDecoded = jwt.verify(token, config.SECRET)
        if(!tokenDecoded) {
            throw {message: 'Token invalid signature', code: 401}
        }
        return tokenDecoded
    } catch (error) {
        console.error(error)
        throw error
    }
}

function checkOwner(req, _id) {
    try {
        const payload = decodeHeaderAuthorization(req)
        if(!(payload.sub === _id)) {
            throw {message: 'Is not you!', code: 401}
        }
        return payload
    } catch (error) {
        console.error(error)
        throw error
    }
}

function decodeHeaderAuthorization(req) {
    try {
        const authorization = req.headers.authorization || ''
        const token = authorization.replace(/['"]+/g, '')      
        if(!token) {
            throw {message: 'You dont send any token', code: 401}
        }
        return decodeToken(token)
    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports =
{
    encryptPassword,
    comparePassword,
    generateAndSignToken,
    checkOwner,
}