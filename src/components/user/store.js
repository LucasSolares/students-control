const Model = require('./model')

exports.addUser = async (user) => {
    try {
        const newUser = new Model(user)
        return await newUser.save()
    } catch (error) {
        console.error(error)
        throw error
    }
}