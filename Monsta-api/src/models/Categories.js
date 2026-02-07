const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'name is required'],
        // validate: {
        //     validator: async function (v) {
        //         const name = await this.constructor.findOne({ name: v });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // },
        match: /^[a-zA-Z ]{3,15}$/,
        minLength:[3,'Minimum length is 3'],
        maxLength:[10,'Maximum length is 15']
    },
    image:{
        type: String,
        default:''
    },
    slug:{
        type: String,
        default:''
    },
     product_ids:[{
          type: String,
        // required: [true, 'Parent Category is required'],
           ref: 'products'
    }],
    status: {
        type: Boolean,
        default: true,
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

const categoriesModal=mongoose.model('categories',categorySchema);
module.exports=categoriesModal;

