const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ name: v });
                return !name;
            },
            message: props => `The specified name is already in use.`
        },
        match: /^[a-zA-Z ]{3,45}$/,
    },
    slug: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    },
    actual_price: {
        type: Number,
        required: [true, 'actual price is required'],
        default: 1
    },
    sale_price: {
        type: Number,
        required: [true, 'actual price is required'],
        default: 1
    },
    stocks: {
        type: Number,
        required: [true, 'stocks is required'],
        default: 1
    },
    product_dimension: {
        type: String,
        required: [true, 'dimension is required'],
        default: 1
    },
    product_code: {
        type: Number,
        required: [true, 'dimension is required'],
        default: 1
    },
    delivery_date: {
        type: String,
        default: ''
    },
    is_featured : {
        type : Boolean,
        default : false,
    },
    is_new_arrival : {
        type : Boolean,
        default : false,
    },
    is_on_sale : {
        type : Boolean,
        default : false,
    },

    is_top_rated: {
        type: Boolean,
        default: false,
    },
    is_best_selling: {
        type: Boolean,
        default: false,
    },
    is_up_selling: {
        type: Boolean,
        default: false,
    },
    short_description: {
        type: String,
        required: [true, 'short description is required'],
        default: ''
    },
    long_description: {
        type: String,
        required: [true, 'long description is required'],
        default: ''
    },
    parent_category_ids: [{
        type: String,
        required: [true, 'Parent Category is required'],
        ref: 'categories'
    }],
    sub_category_ids: [{
        type: String,
        required: [true, 'Sub Category is required'],
        ref: 'sub_categories'
    }],
    sub_sub_category_ids: [{
        type: String,
        required: [true, 'Sub Sub Category is required'],
        ref: 'sub_sub_categories'
    }],
    color: [{
        type: String,
        required: [true, 'Color is required'],
        ref: 'colors'
    }],
    material: [{
        type: String,
        required: [true, 'Color is required'],
        ref: 'materials'
    }],
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

const productModal = mongoose.model('products', productSchema);
module.exports = productModal;