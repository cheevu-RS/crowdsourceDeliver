const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.Model

const constantsSchema = Schema({
    deliverySuccessRatio : {type : Schema.Types.Decimal128, required : true},
})

module.exports = {
    Constants : Model("Constants Schema", constantsSchema)
}
