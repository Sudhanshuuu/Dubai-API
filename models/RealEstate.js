const mongoose = require('mongoose');
const RealEstateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    },
    message: {
        type: String,
    },
    state: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    bedrooms: {
        type: String
    },
    floors: {
        type: String
    },
    bathrooms: {
        type: String
    },
    square: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    display: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    listedBy: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    feature: {
        type: String,
    }
})

const RealEstate = new mongoose.model('RealEstate', RealEstateSchema);
module.exports = RealEstate;