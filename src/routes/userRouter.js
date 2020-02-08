const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")

userRouter.get('/getUser/:username',
    userController.getUser
)

userRouter.post('/createUser',
    userController.createUser
)

userRouter.put('/updateUser',
    userController.updateUser
)

userRouter.post('/addFriend',
    userController.addFriend
)

userRouter.get('/getUsers',
    userController.getUsers
)

userRouter.delete('/deleteUser',
    userController.deleteUser
)

userRouter.get('/getAllFriends',
    userController.returnAllFriends
)

userRouter.get('/getValidOrders',
    userController.getValidOrders
)

module.exports = {
    userRouter : userRouter
}