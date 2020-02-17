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

exports.updateUser = async (_id, userToUpdate) => {

    try {
        const userUpdated = await Model.findByIdAndUpdate(_id, userToUpdate, {new: true})
        if(!userUpdated){
            throw {message: `User with id ${_id} not found!`, code: 404}
        }
        return userUpdated
    } catch (error) {
        console.error(error)
        throw error
    }

}