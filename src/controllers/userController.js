const {UserData} = require("../models/userModel")
const {OrderData} = require("../models/orderModel")
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
    let friendId = req.query.friendUsername

    if(!friendId){
        res.json("No friend id recieved")
    }

    let username = req.query.username
    let user = await UserData.findOne({username : username})
    let friendList = user.friendList

    if(friendList.length == 0){
        friendList = [friendId]
    }else{
        friendList.push(friendId)
    }
    
    await UserData.findOneAndUpdate({username : username, $set : {friendList : friendList}})
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
    if(!username){
        return res.status(400).json({
            message : "No username found"
        })
    }
    let friends = await getFriends(username)
    let validOrders = []

    // Checking if any of these friends have issued any orders
    for(let i = 0; i < friends.length; ++i){
        let friend_obj = friends[i]
        let friend_data = friend_obj.data
        let friendId = friend_data._id
        let orders = await OrderData.find({ordererId : friendId})
        if(!orders || orders.length == 0){
            continue;
        }
        for(let i = 0; i < orders.length; ++i){
            let order = orders[i]
            validOrders.push(order)
        }
    }
    
    return res.json(validOrders)
}

// Returns friends at depth 2
let getFriends = async(username) => {
    let user = await UserData.findOne({username : username})
    if(!user){
        return [];
    }

    let friends = user.friendList
    // console.log(friends)

    let return_data = new Set()
    for(let i = 0; i < friends.length; ++i){
        let friend = friends[i]
        let friend_details = await UserData.findOne({username : friend})
        
        if(!friend_details){
            continue;
        }

        return_data.add({data : friend_details, depth : 1})
        if(return_data.has({data : friend_details, depth : 2})){
            return_data.delete({data : friend_details, depth : 2})
        }

        for(let j = 0; j < friend_details.friendList.length; ++j){
            let friend_friend = friend_details.friendList[j]
            // console.log(friend_friend, "Friend friend")
            let friend_friend_details = await UserData.findOne({username : friend_friend})
            if(!return_data.has({data : friend_friend_details, depth : 1})){
                return_data.add({data : friend_friend_details, depth : 2}) 
            }
        } 
    }

    let final_data = Array.from(return_data)
    return final_data
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