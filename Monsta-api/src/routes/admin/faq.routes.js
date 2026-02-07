const express=require('express');
const { create, view, update, details, changeStatus, destroy } = require('../../controllers/admin/faq.controller');
const router = express.Router();


module.exports = server => {
  
    router.post('/create', create);
    router.post('/view',view);
    router.put('/update/:id', update);
    router.post('/details', details);
    router.put('/change-status',  changeStatus);
    router.put('/delete', destroy);


    server.use('/api/admin/faq', router);
}