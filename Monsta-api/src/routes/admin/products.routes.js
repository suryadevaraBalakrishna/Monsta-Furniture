const express = require('express');
const { create, view, update, details, changeStatus, destroy, productdetails } = require('../../controllers/admin/products.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads/products' })
const path =require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            var imagePath=path.extname(file.originalname);
            console.log(imagePath);
            cb(null, file.fieldname + '-' + uniqueSuffix + imagePath);
        }
    })

    const upload = multer({ storage: storage })

    // const singleImage = upload.single('image');
    // const multipleImages = upload.array('images', 6);
    const singleMultiple = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 6 }])

    router.post('/create', singleMultiple, create);
    router.post('/view', upload.none(), view);
    router.put('/update/:id', singleMultiple, update);
    router.post('/details', upload.none(), details);
    router.post('/product-details', upload.none(), productdetails);
    router.put('/change-status', upload.none(), changeStatus);
    router.put('/delete', upload.none(), destroy);

    server.use('/api/admin/products', router);
}