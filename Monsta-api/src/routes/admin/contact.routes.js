const express=require('express');
const {view}=require('../../controllers/admin/contact.controller');
const router=express.Router();

module.exports=server=>{
    
    router.post('/view',view)
    
    server.use('/api/admin/contact',router);
}
