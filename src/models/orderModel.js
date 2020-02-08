const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const Order = Schema({
    ordererId : {type : Schema.Types.ObjectId, required : true},
    delivererId : {type : Schema.Types.ObjectId},
    cost : {type : Schema.Types.Decimal128},
    itemDescription : {type : String, required : true},
    pickupLocation : {type : String, required : true},
    dropLocation : {type : String, required : true},
    orderCreationTime : {type : Schema.Types.Date, required : true, default : Date.now()},
    // If status is 0 -> Delivery dude hasn't reached pickup point
    // If status is 1 -> Delivery dude has reached pickup point
    // If status is 2 -> Delivery dude has picked up the item
    // If status is 3 -> Delivery dude has reached drop location
    // If status is 4 -> Delivery dude has delivered
    status : {type : [Schema.Types.Date]},
    
})

module.exports = {
    OrderData : Model('OrderSchema', Order)
}
