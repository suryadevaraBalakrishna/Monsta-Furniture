const express=require('express');
const { view, menuCategories } = require('../../controllers/website/categories.controller');
const router=express.Router();



module.exports = server => {

 
    router.post('/view', view);
    router.post('/menu',menuCategories)

    server.use('/api/website/categories', router);
}