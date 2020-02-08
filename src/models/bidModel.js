const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const bidSchema = Schema({
    orderId : {type : String, required : true},
    userId : {type : String, required : true},
    bidPrice : {type : Schema.Types.Decimal128, required : true},
    // In minutes
    ETA : {type : Number},
    timeOfCreation : {type : Schema.Types.Date, required : true, default : Date.now()}
})

module.exports = {
    Bid : Model("Bid Schema", bidSchema)
}

export{};
