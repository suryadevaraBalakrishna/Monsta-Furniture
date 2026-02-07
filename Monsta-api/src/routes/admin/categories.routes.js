const express = require('express');
const { create, view, update, details, changeStatus, destroy } = require('../../controllers/admin/categories.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads/categories' })
const path =require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            var imagePath=path.extname(file.originalname);
            console.log(imagePath);
            cb(null, file.fieldname + '-' + uniqueSuffix + imagePath);
        }
    })

    const upload = multer({ storage: storage })


    const singleImage = upload.single('image');
    const multipleImages = upload.array('images', 6);
    const singleMultiple = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 6 }])

    router.post('/create', singleImage, create);
    router.post('/view', upload.none(), view);
    router.put('/update/:id', singleImage, update);
    router.post('/details', upload.none(), details);
    router.put('/change-status', upload.none(), changeStatus);
    router.put('/delete', upload.none(), destroy);


    server.use('/api/admin/categories', router);
}