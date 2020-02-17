const Store = require('./store')
const StoreAuth = require('../auth/store')

const Auth = require('../../auth')


async function addUser(username = '', password = '', email = '', name = '', lastName = '') {

    try {
        username = username.trim()
        password = password.trim()
        email = email.trim()
        name = name.trim()
        lastName = lastName.trim()
        if (!(username && password && email && name && lastName)) {
            throw { message: 'Missing data! Something like username, password, email, name or lastName', code: 400 }
        }
        const userAlreadyExists = await StoreAuth.confirmUserExists({ $or: [{ username }, { email }] })
        if (userAlreadyExists) {
            throw { message: `User with email ${email} or username ${username} already exists`, code: 400 }
        }
        const newUser = await Store.addUser({ name, lastName })
        const passwordEncrypted = await Auth.encryptPassword(password)
        await StoreAuth.registerUser({ username, password: passwordEncrypted, email, user: newUser._id })
        return newUser

    } catch (error) {
        console.error(error)
        throw error
    }

}

async function updateUser(username = '', password = '', email = '', name = '', lastName = '') {

    let credentialToUpdate = {}
    let userToUpdate = {}

    let userUpdated = 'Credentials Update Correct'

    try {
        username = username.trim()
        password = password.trim()
        email = email.trim()
        name = name.trim()
        lastName = lastName.trim()
        if (username) {
            credentialToUpdate.username = username
        }
        if (password) {
            credentialToUpdate.password = Auth.encryptPassword(password)
        }
        if (email) {
            credentialToUpdate.email = email
        }
        if (name) {
            userToUpdate.name = name
        }
        if (lastName) {
            userToUpdate.lastName = lastName
        }
        if (Object.keys(credentialToUpdate).length === 0 || Object.keys(userToUpdate).length === 0) {
            if (Object.keys(credentialToUpdate).length !== 0) {
                await StoreAuth.updateCredentials(req.payload.sub, credentialToUpdate)
            }
            if (Object.keys(userToUpdate).length !== 0) {
                userUpdated = await StoreAuth.updateCredentials(req.payload.user._id, credentialToUpdate)
            }
        } else {
            throw { message: 'Missing data! Something min 1 attrib' }
        }


        return userUpdated


    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports =
{
    addUser,
    updateUser
}