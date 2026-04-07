const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const tokenBlacklistModel = require("../models/blacklist.model")


/**
     * @name registerUserController
     * @description register a new user requires name, email and password
     * @access Public
     */
async function registerUserController(req,res){
    const {username, email, password} = req.body
    
    if (!username || !email || !password){
     return res.status(400).json({
          message:"Please provide all required fields."
     })
    }

    const UserAlreadyExists = await userModel.findOne({
     $or:[{username},{email}]
    })

    if (UserAlreadyExists){
     if(UserAlreadyExists.username == username){
          return res.status(400).json({
               message:"Username already exists"
          })
     }
     else {
          return res.status(400).json({
               message:"Email already exists"
          })
     }
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
     username,
     email,
     password : hash
    })

    const token = jwt.sign(
     {id: user._id, username : user.username},
     process.env.JWT_SECRET,
     {expiresIn: "1d"}
    )
    
    res.cookie("token", token)

    res.status(201).json({
     message:"User registered successfully",
     user : {
          id: user._id,
          username: user.username,
          email : user.email
     }
    })
}

/**
 * @name loginUserController
 * @description login a user using email and password
 * @access Public
 */
async function loginUserController(req, res){
     const {email, password} = req.body

     const user = await userModel.findOne({email})
     if(!user){
          res.status(400).json({
               message:"Invalid email or password"
          })
     }

     const IsPasswordValid = await bcrypt.compare(password, user.password)

     if(!IsPasswordValid){
          res.status(400).json({
               message:"Invalid email or password"
          })
     }

     const token = await jwt.sign(
          {id: user._id, username: user.username},
          process.env.JWT_SECRET,
          {expiresIn: "1d"}
     )

     res.cookie("token", token)

     res.status(200).json({
          message: "User Logged In successfully",
          user :{
               id: user._id,
               username: user.username,
               email: user.email
          }
     })
}

/**
 * @name logoutUserController
 * @description logout a user by deleting token from cookie and blacklisting token
 * @access Public
 */
async function logoutUserController(req, res) {
     const token  = req.cookies.token

     if (token){
          await tokenBlacklistModel.create({token})
     }

     res.clearCookie(token)
     res.status(200).json({
          message:"User logged out successfully"
     })
}

/**
 * @name getUserController
 * @description get details of the logged in user
 * @access Private
 */
async function getUserController(req,res){
     const user = userModel.findById(req.user._id)

     res.status(200).json({
          message:"User detailes found successfully",
          user:{
               id: user._id,
               username: user.username,
               email: user.email
          }
     })
}

module.exports = {registerUserController, loginUserController, logoutUserController, getUserController}