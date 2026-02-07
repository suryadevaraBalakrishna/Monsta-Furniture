const mongoose=require('mongoose');

const subcategorySchema=new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'name is required'],
        match: /^[a-zA-Z ]{3,15}$/,
        minLength:[3,'Minimum length is 3'],
        maxLength:[30,'Maximum length is 30']
    },
    parent_category_id:{
          type: String,
        // required: [true, 'Parent Category is required'],
           ref: 'categories'
    },
    parent_category_ids:[{
          type: String,
        // required: [true, 'Parent Category is required'],
           ref: 'categories'
    }],
     product_ids:[{
          type: String,
        // required: [true, 'Parent Category is required'],
           ref: 'products'
    }],
    image:{
        type: String,
        default:''
    },
     slug:{
        type: String,
        default:''
    },
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

const subcategoriesModal=mongoose.model('sub_categories',subcategorySchema);
module.exports=subcategoriesModal;

