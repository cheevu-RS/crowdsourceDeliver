const {Order} = require("./../models/orderModel")
const {User} = require("./../models/userModel")
const {Bid} = require("./../models/bidModel")
const {sendNotif} = require("./../sendNotif")
require("./../controllers/userController")

let createOrder = async(req, res, next) => {
    let ordererId = req.query.ordererId
    let itemDescription = req.query.itemDescription
    let newOrder = new Order({
        ordererId : ordererId,
        itemDescription : itemDescription
    })
    
    await newOrder.save()

    res.send("Created order")
}

//Send order to all your friends....
let broadCastOrder = async(req,res) => {
    let orderId = req.orderId;
    let userName = req.userName;
    let friends = await getFriends(userName); //Query for all his friends....
    friends.forEach(friend => {
        let subs = User.findOne({_id: friend}).subscription;
        let content = "Your friend wants you to carry his package from xxxx";
        sendNotif("New Delivery",content,"login",subs)
    });
}

//Update Tracking status
let updateStatus = async(req,res) => {
    let messages = ["Your order has been arrived",
                    "Your order has been collected",
                    "Your order is waiting at your doorsteps"]
    let status = req.status;
    let userId = req.userId;
    try {
        await Order.findOneAndUpdate({_id:req.orderId},{$set : {status:status}})
        res.status(200).send("Successfully updated");
        let subs = User.findOne({_id: userId}).subscription;
        sendNotif("Order Update!", messages[status],"login",subs);
    } catch (e) {
        res.status(500).send(e);
    }
}

let getAllOrders = async(req,res) => {
    try {
        let doc = await Order.find({});
        return res.status(200).send(doc);
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    createOrder : createOrder,
    updateStatus: updateStatus,
    broadCastOrder: broadCastOrder,
    getAllOrders : getAllOrders
}