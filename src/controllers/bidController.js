const {Bid} = require("../models/bidModel")

let createBid = async(req, res, next) => {
    let orderId = req.query.orderId
    let bidAmount = req.query.bidAmount
    let userId = req.query.userId
    let new_bid = new Bid({
        orderId : orderId,
        bidAmount : bidAmount, 
        userId : userId
    })

    await new_bid.save()

    return res.send("Bid created successfully")
}

let getSortedBids = async(req, res, next) => {
    let orderId = req.query.orderId
    let bids = await Bid.find({_id : orderId}).sort((a, b) => a < b)
    return bids
}

// Delete all the bids given orderId
const deleteBids = async(req, res, next) => {
    let orderId = req.query.orderId
    await Bid.findAndRemove({orderId : orderId})
    res.send("Successfully deleted bids")
}  

// Delete bid given bid id
let deleteBid = async(req, res, next) => {
    let bId = req.query.bId
    await Bid.findOneAndRemove({_id : bId})
    res.send("Successfully deleted bid")
}


module.exports = {
    createBid : createBid,
    deleteBid : deleteBid,
    deleteBids : deleteBids,
    getSortedBids: getSortedBids,
}