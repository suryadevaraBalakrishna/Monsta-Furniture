const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ name: v });
                return !name;
            },
            message: props => `The specified email is already in use.`
        },
    },
   
    order: {
        type: Number,
        default: 0,
        min : [0,'Minimum value must be greater than 0'],
        max : [1000,'Maximum value must be greater than 1000']
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

const newsModal = mongoose.model('newsletter', newsSchema);

module.exports = newsModal;