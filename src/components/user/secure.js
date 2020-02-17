const response = require('../../network/response')
const Auth = require('../../auth')

exports.checkAuth = (action) => {

    function authMiddleWare(req, res, next) {
        const {_id} = req.body
        try {
            switch (action) {
                case 'update':
                    if(!_id) {
                        throw {message: 'Missing data, something Like _id', code: 400}
                    }
                    req.body.payload = Auth.checkOwner(req, _id)
                    next()
                default:
                    throw {message: `Not Implemented Yet, AuthMiddleWare action ${action}`}
            }
        } catch (error) {
            console.error(error)
            response.error(res, error.code)
        }
    }

    return authMiddleWare

}