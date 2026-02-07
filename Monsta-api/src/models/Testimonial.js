const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    image: {
        type: String,
        default: ''
    },
    designation: {
        type: String,
        default: ''
    },
    rating: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
        min: [0, 'Minimum value must be greater than 0'],
        max: [1000, 'Maximum value must be greater than 1000']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: '',
    }
})


const testimonailModal=mongoose.model('testimonials',testimonialSchema);
module.exports =testimonailModal;