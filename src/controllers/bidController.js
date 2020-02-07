const {Bid} = require("./../models/bidModel")

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

let deleteBid = async(req, res, next) => {
    let bId = req.query.bId
    await User.findOneAndRemove({_id : bId})
    res.send("Successfully deleted user")
}


module.exports = {
    createBid : createBid,
    deleteBid : deleteBid
}