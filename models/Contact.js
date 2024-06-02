const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
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

const Contact = new mongoose.model('Contact', ContactSchema);
module.exports = Contact;