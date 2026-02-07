const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'name is required'],
        match: /^[a-zA-Z ]{3,15}$/,
    },
     image:{
        type: String,
        default:''
    },
     password:{
        type: String,
        default:'',
        required: [true, 'password is required'],
    },
    email:{
        type: String,
        default:'',
        required: [true, 'email is required'],
    },
    mobile_number:{
        type: String,
        default:'',
        required: [true, 'mobile number is required'],
    },
    role_type:{
        type:String,
        required:[true, 'Type is required'],
        enum:['Admin','User']
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


const userModal=mongoose.model('users',userSchema);
module.exports=userModal;