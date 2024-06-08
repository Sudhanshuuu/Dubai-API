const mongoose = require('mongoose');
const CareerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    age : {
        type:String ,
        required:true
    },
    position : {
        type:String ,
        required:true
    },
    cv : {
        type:String ,
        required:true
    } 


})

const Career = new mongoose.model('Career', CareerSchema);
module.exports = Career;