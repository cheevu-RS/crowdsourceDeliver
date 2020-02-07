const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mogoose.Model

const bidSchema = Schema({
    orderId : {type : Schema.Types.ObjectId, required : true},
    userId : {type : Schema.Types.ObjectId, required : true},
    bidPrice : {type : Schema.Types.Decimal128, required : true},
    // In minutes
    ETA : {type : Number},
    timeOfCreation : {type : Schema.Types.Date, required : true, default : Date.now()}
})

module.exports = {
    Bid : Model("Bid Schema", bidSchema)
}