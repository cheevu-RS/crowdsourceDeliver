const {UserData} = require("../models/userModel")
const mongoose = require("mongoose")

let getUser = async(req, res, next) => {
    
    let username = req.params.username
    if(!username){
        return res.json({msg:"No username recieved",success: false})
    }
    
    let user = await UserData.find({username : {'$regex' : `^${username}`, '$options' : 'g'}})
    
    if(!user){
        return res.json({msg:"No user found",success: false})
    }

    return res.json(user)
}

let createUser = async(req, res, next) => {
    let userData = req.query
    let newUser = new UserData(userData)
    await newUser.save()
    res.json("Successfully created user")
}

let updateUser = async(req, res, next) => {
    let username = req.query.username
    let userData = req.query
    await UserData.findOneAndUpdate({username : username, $set : {userData}})
    res.json("Successfully updated user")
}

let addFriend = async(req, res, next) => {
    let friendId = req.query.friendId

    if(!friendId){
        res.json("No friend id recieved")
    }

    let username = req.query.username
    let user = await UserData.findOne({username : username})
    let friendList = user.friendList
    friendId = mongoose.Types.ObjectId(friendId)
    if(!friendList){
        friendList = [friendId]
    }
    else{
        friendList.push(friendId)
    }
    await UserData.findOneAndUpdate({username : username, $set : {friendList : user.friendList}})
    res.json("Successfully added friend " + friendId + " to user " + username)
}

let getUsers = async(req, res, next) => {
    let users = await UserData.find({})
    return res.json(users)
}

let returnAllFriends = async(req, res, next) => {
    let username = req.query.username
    let friends = getFriends(username)
    return res.json(friends)
}

let deleteUser = async(req, res, next) => {
    let username = req.query.username

    if(!username)
        return res.json("No username recieved")
    
    await UserData.deleteMany({username : username})
    res.json("User successfully deleted")
}

let getValidOrders = async(req, res, next) => {
    let username = req.query.username
    let friends = await getFriends(username)

    let validOrders = []

    // Checking if any of these friends have issued any orders
    for(let friend_obj in friends){
        let friend_data = friend_obj.data
        let friendId = friend_data._id
        let orders = await Order({ordererId : friendId})
        for(let order in orders){
            validOrders.append(order)
        }
    }
    
    res.json(validOrders)
}

// Returns friends at depth 2
let getFriends = async(username) => {
    let user = await UserData.findOne({username : username})
    if(!user){
        return [];
    }
    let friends = user.friendList

    let friend_data = new Set()
    for(let friend in friends){
        let friend_details = await UserData.findOne({_id : friend})
        friend_data.add({data : friend_details, depth : 1})
        if(friend_data.has({data : friend_details, depth : 2})){
            friend_data.delete({data : friend_details, depth : 2})
        }
        let friend_friends = friend_details.friendList 
        for(let friend_friend in friend_friends){
            let friend_friend_details = await UserData.findOne({_id : friend_friend})
            if(!friend_data.has({data : friend_friend_details, depth : 1})){
                friend_data.add({data : friend_friend_details, depth : 2}) 
            }
        }
    }

    return friend_data
}

module.exports = {
    getUser : getUser,
    getUsers : getUsers,
    createUser : createUser,
    addFriend : addFriend,
    getFriends : getFriends,
    returnAllFriends : returnAllFriends,
    getValidOrders : getValidOrders,
    updateUser : updateUser,
    deleteUser : deleteUser
}