const express=require('express');
const { view } = require('../../controllers/website/slider.controller');
const router=express.Router();

module.exports = server => {

 
    router.post('/view', view);

    server.use('/api/website/slider', router);
}