const express=require('express');
const { view } = require('../../controllers/website/whychoose.controller');
const router=express.Router();

module.exports = server => {

 
    router.post('/view', view);

    server.use('/api/website/whychoose', router);
}