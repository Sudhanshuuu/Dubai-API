const mongoose = require('mongoose');
const EnquirySchema = new mongoose.Schema({
 
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
    }


})

const Enquiry = new mongoose.model('Enquiry', EnquirySchema);
module.exports = Enquiry;