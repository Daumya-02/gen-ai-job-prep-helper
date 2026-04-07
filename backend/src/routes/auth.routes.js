const {Router} = require("express")
const authControllers = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = Router()

// routes

/**
 * @route POST '/api/auth/register'
 * @description register new user
 * @access Public
 */
authRouter.post('/register', authControllers.registerUserController )

/**
 * @route POST '/api/auth/login'
 * @description login a user using email and password
 * @access Public
 */
authRouter.post('/login', authControllers.loginUserController)

/**
 * @route GET '/api/auth/logout'
 * @description logout user by deleting token from cookie and blacklisting token
 * @access Public
 */
authRouter.get('/logout', authControllers.logoutUserController)

/**
 * @route GET '/api/auth/getUser'
 * @description get details of logged in user
 * @access Private
 */
authRouter.get('/getUser', authMiddleware.authUser, authControllers.getUserController)


module.exports = authRouter