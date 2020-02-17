const Model = require('./model')

exports.confirmUserExists = async (userEmailFilter) => {

    try {
        const userAlreadyExists = !!((await Model.find(userEmailFilter)).pop())
        return userAlreadyExists
    } catch (error) {
        console.error(error)
        throw error
    }

}

exports.registerUser = async (userCredential) => {

    try {
        const newUserCredential = new Model(userCredential)
        return await newUserCredential.save()
    } catch (error) {
        console.error(error)
        throw error
    }

}

exports.loginUser = async (credential) => {

    try {
        const userCorrect = await Model.findOne(credential)
        return userCorrect
    } catch (error) {
        console.error(error)
        throw error
    }

}