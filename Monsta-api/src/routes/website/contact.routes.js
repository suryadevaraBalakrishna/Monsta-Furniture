const express=require('express');
const {create}=require('../../controllers/website/contact.controller');
const router=express.Router();

module.exports=server=>{
    
    router.post('/create',create)
    
    server.use('/api/website/contact',router);
}
