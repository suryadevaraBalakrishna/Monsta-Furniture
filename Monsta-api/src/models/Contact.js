const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'name is required'],
    },
    email:{
         type: String,
          default:''
    },
    mobile_number:{
         type: String,
          default:''
    },
    subject:{
         type: String,
          default:''
    },
    message:{
         type: String,
          default:''
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

const contactModal=mongoose.model('contacts',contactSchema);
module.exports=contactModal;