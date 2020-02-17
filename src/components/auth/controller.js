const Store = require('./store')
const Auth = require('../../auth')

async function loginUser(email = '', password = '') {

    try {
        email = email.trim()
        password = password.trim()
        if(!(email && password)) {
            console.log('AAA')
            throw {message: 'Missing data, something like email or password', code: 400}
        }
        const userMatch = await Store.loginUser({email})
        if(!userMatch) {
            throw {message: `User identified by email ${email} not found`, code: 401}
        }
        const passwordMatch = await Auth.comparePassword(password, userMatch.password)
        if(!passwordMatch) {
            throw {message: `Password incorrect`, code: 401}
        }
        return {token: Auth.generateAndSignToken({sub: userMatch._id, rol: userMatch.rol, user: userMatch.user})}
    } catch (error) {
        console.error(error)
        throw error
    }

}

module.exports = 
{
    loginUser,
}