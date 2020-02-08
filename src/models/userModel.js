const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const UserSchema = Schema({
    name : {type : String, required : true},
    username : {type : String, required : true, unique : true},
    phoneNumber : {type : Number, required : true},
    year : {type : Number, required : true},
    department : {type : String, required: true},
    rollNo : {type : String, required : true},
    friendList : {type : [String]},
    rating : {type : Number},
    subscription : {type : String}
})

module.exports = {
    UserData : Model('UserModel', UserSchema)
}