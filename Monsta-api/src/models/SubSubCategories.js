const mongoose=require('mongoose');

const subsubcategorySchema=new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'name is required'],
        match: /^[a-zA-Z ]{3,100}$/,
        minLength:[3,'Minimum length is 3'],
        maxLength:[100,'Maximum length is 100']
    },
       parent_category_id:{
          type: String,
        required: [true, 'Parent Category is required'],
           ref: 'categories'
    },
     sub_category_id:{
          type: String,
        required: [true, 'Sub Category is required'],
           ref: 'sub_categories'
    },
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

const subsubcategoriesModal=mongoose.model('sub_sub_categories',subsubcategorySchema);
module.exports=subsubcategoriesModal;