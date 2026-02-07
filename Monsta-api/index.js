const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const bodyParser = require('body-parser');
const server = express();
require('dotenv').config()

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

//body parse
server.use(bodyParser.json());

//cors
server.use(cors());


server.get('/',(request,response)=>{
    response.send('Welcome to mongoose');
})




//Admin API url
require('./src/routes/admin/color.routes')(server);
require('./src/routes/admin/material.routes')(server);
require('./src/routes/admin/categories.routes')(server);
require('./src/routes/admin/sub-categories.routes')(server);
require('./src/routes/admin/sub-sub-catogories.routes')(server);
require('./src/routes/admin/products.routes')(server);
require('./src/routes/admin/user.routes')(server);
require('./src/routes/admin/whychoose.route')(server);
require('./src/routes/admin/slider.route')(server);
require('./src/routes/admin/testimonial.route')(server);
require('./src/routes/admin/faq.routes')(server);
require('./src/routes/admin/dashboard.routes')(server);
require('./src/routes/admin/contact.routes')(server);
require('./src/routes/admin/newsletter.routes')(server);
require('./src/routes/admin/order.routes')(server);

//Image
server.use('/uploads/categories',express.static('uploads/categories'));
server.use('/uploads/sub-categories',express.static('uploads/sub-categories'));
server.use('/uploads/sub-sub-categories',express.static('uploads/sub-sub-categories'));
server.use('/uploads/products',express.static('uploads/products'));
server.use('/uploads/user',express.static('uploads/user'));
server.use('/uploads/choose',express.static('uploads/choose'));
server.use('/uploads/slider',express.static('uploads/slider'));
server.use('/uploads/testimonial',express.static('uploads/testimonial'));

//Website API Url
require('./src/routes/website/user.routes')(server);
require('./src/routes/website/slider.routes')(server);
require('./src/routes/website/testimonials.routes')(server);
require('./src/routes/website/whychoose.routes')(server);
require('./src/routes/website/product.routes')(server);
require('./src/routes/website/categories.routes')(server);
require('./src/routes/website/color.routes')(server);
require('./src/routes/website/material.routes')(server);
require('./src/routes/website/order.routes')(server);
require('./src/routes/website/contact.routes')(server);
require('./src/routes/website/newsletter.routes')(server);

server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB)
        .then(() => console.log('Connected!'))
        .catch((error) => console.log(error))
})