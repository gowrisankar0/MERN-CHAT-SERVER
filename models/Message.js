const mongoose = require("mongoose");


const messageScehma = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});



const Message = mongoose.model("Message",messageScehma);

module.exports = Message;