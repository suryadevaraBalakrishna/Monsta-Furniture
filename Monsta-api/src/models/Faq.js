const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'question is required'],
    },
   
    answer: {
        type: String,
        default: '',
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


const faqModal=mongoose.model('faqs',faqSchema);
module.exports =faqModal;