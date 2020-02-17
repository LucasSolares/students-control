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
        const userMatch = Model.findOne(credential)
        let userCorrect = false
        if(userMatch) {
            userCorrect = await userMatch.populate('user').exec()
        }
        return userCorrect
    } catch (error) {
        console.error(error)
        throw error
    }

}

exports.updateCredentials = async (_id, credentialToUpdate) => {

    try {
        const credentialUpdated = await Model.findByIdAndUpdate(_id, credentialToUpdate)
        if(!credentialUpdated) {
            throw {message: `Credential with id ${_id} not found!`, code: 404}
        }
        return credentialUpdated
    } catch (error) {
        console.error(error)
        throw error
    }

}