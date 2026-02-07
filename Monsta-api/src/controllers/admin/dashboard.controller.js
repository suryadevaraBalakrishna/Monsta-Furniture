const productsModal = require('../../models/Product');
const userModal= require('../../models/User');
const orderModal=require('../../models/Order');

require('dotenv').config()

exports.view = async (request, response) => {



    const addCondition = [
        {
            deleted_at: null,
        }
    ];

    const orCondition = [];



    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}
    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var totalRecords = await productsModal.find(filter).countDocuments();

    var totalProducts = await productsModal.aggregate([
        { $match: filter },
        { $count: 'totalProducts' }
    ])

    var allProductCalculation = await productsModal.aggregate([
        { $match: filter },
        {
            $group: {
                _id: '',
                minPrice: { $min: "$sale_price" },
                maxPrice: { $max: "$sale_price" },
                total: { $sum: "$sale_price" },
                avgPrice: { $avg: "$sale_price" },

            }
        }
    ])

    var totalUsers=await userModal.find(filter).countDocuments();

    var totalOrders=await orderModal.find(filter).countDocuments();



    const output = {
        _status: true,
        _message: 'Record Found',
        totalUsers:totalUsers,
        totalOrders:totalOrders,
        totalRecords: totalRecords,
        totalProducts: totalProducts,
        allProductCalculation: allProductCalculation
    }

    response.send(output);




}
