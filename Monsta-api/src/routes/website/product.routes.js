const express = require('express');
const { view, productdetails, relatedProducts } = require('../../controllers/website/product.controller');
const router = express.Router();

/* 🔥 ADD THESE TWO LINES */
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = server => {


    router.post('/view', view);
    router.post('/product-details', productdetails);
    router.post('/related-product', relatedProducts);

    server.use('/api/website/product', router);
}