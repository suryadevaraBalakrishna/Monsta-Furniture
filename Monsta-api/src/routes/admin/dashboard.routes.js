const express = require('express');
const { view } = require('../../controllers/admin/dashboard.controller');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads' })

module.exports = server => {

   
    router.post('/', upload.none(), view);

    server.use('/api/admin/dashboard', router);
}