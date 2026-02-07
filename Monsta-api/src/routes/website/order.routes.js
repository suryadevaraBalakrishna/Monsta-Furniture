const express = require('express');
const { orderPlaced, changeStatus, myOrders } = require('../../controllers/website/order.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads' })



module.exports = server => {
    router.post('/order-placed', uploads.none(), orderPlaced);
    router.post('/change-status', uploads.none(), changeStatus);
       router.post('/my-order', uploads.none(), myOrders);

    server.use('/api/website/order', router);
}


