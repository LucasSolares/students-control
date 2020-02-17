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
        if(!(username && password && email && name && lastName)) {
            throw {message: 'Missing data! Something like username, password, email, name or lastName', code: 400}
        }
        const userAlreadyExists = await StoreAuth.confirmUserExists({$or: [{username}, {email}]})
        if(userAlreadyExists) {
            throw {message: `User with email ${email} or username ${username} already exists`, code: 400}
        }
        const newUser = await Store.addUser({name, lastName})
        const passwordEncrypted = await Auth.encryptPassword(password)
        await StoreAuth.registerUser({username, password: passwordEncrypted, email, user: newUser._id})
        return newUser

    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports =
{
    addUser,
}