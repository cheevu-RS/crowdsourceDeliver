const {Order} = require("./../models/orderModel")
const {Bid} = require("./../models/bidModel")

let getSortedBids = async(req, res, next) => {
    let orderId = req.query.orderId
    let bids = await Bid.find({_id : orderId}).sort((a, b) => a < b)
    return bids
}

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

module.exports = {
    getSortedBids : getSortedBids,
    createOrder : createOrder
}