const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const UserSchema = Schema({
    name : {type : String, required : true},
    username : {type : String, required : true},
    phoneNumber : {type : Number, required : true},
    year : {type : Number, required : true},
    department : {type : String, required: true},
    rollno : {type : String, required : true},
    friendList : {type : [Schama.Types.ObjectId]},
    rating : {type : Number},
    subscription : {type : String}
})

module.exports = {
    User : Model('User Model', UserSchema)
}