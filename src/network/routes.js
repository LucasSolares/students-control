const userRouter = require('../components/user/network')
const authRoutes = require('../components/auth/network')

exports.generateRoutes = (app) => {

    app.use('/user', userRouter)
    app.use('/auth', authRoutes)
}