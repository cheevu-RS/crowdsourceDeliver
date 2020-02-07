const {User} = require("./../models/userModel")

let getUser = async(req, res, next) => {
    let username = req.query.username
    let user = await User.findOne({username : username})
    
    if(!user){
        res.send("No user found")
    }

    return res.send(user)
}

let createUser = async(req, res, next) => {
    let userData = req.query
    let newUser = new User(userData)
    await newUser.save()
}

let addFriend = async(req, res, next) => {
    let friendId = req.query.friendId
    let username = req.query.username
    let user = await User.findOne({username : username})
    user.friendList.append(friendId)
    await User.findOneAndUpdate({username : username, $set : {friendList : user.friendList}})
    res.send("Successfully added friend " + friendId + " to user " + username)
}

let getUsers = async(req, res, next) => {
    let users = await User.find({})
    return users
}

// Returns friends at depth 2
let getFriends = async(req, res, next) => {
    let username = req.query.username
    let user = await User.findOne({username : username})
    let friends = user.friendList

    let friend_data = new Set()
    for(let friend in friends){
        let friend_details = await User.findOne({_id : friend})
        friend_data.add({data : friend_details, depth : 1})
        if(friend_data.has({data : friend_details, depth : 2})){
            friend_data.delete({data : friend_details, depth : 2})
        }
        let friend_friends = friend_details.friendList 
        for(let friend_friend in friend_friends){
            let friend_friend_details = await User.findOne({_id : friend_friend})
            if(!friend_data.has({data : friend_friend_details, depth : 1})){
                friend_data.add({data : friend_friend_details, depth : 2}) 
            }
        }
    }
}

module.exports = {
    getUser : getUser,
    getUsers : getUsers,
    createUser : createUser,
    addFriend : addFriend,
    getFriends : getFriends
}