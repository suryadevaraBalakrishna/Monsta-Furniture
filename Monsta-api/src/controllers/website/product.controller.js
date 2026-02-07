const productsModal = require('../../models/Product');
const subsubcategoriesModal=require('../../models/SubSubCategories');
require('dotenv').config()

exports.view = async (request, response) => {

    var current_page = 1;
    var limit = 4;
    var skip = (current_page - 1) * limit;

    if (request.body != undefined) {
        var current_page = request.body.page ? request.body.page : current_page;
        var limit = request.body.limit ? request.body.limit : limit;
        var skip = (current_page - 1) * limit;
    }

    const addCondition = [
        {
            deleted_at: null,
        }
    ];

    const orCondition = [];

    if (request.body != undefined) {
        if (request.body.name != undefined) {
            if (request.body.name != '') {
                var name = new RegExp(request.body.name, "i");
                orCondition.push({ name: name })
            }
        }

        if (request.body.parent_category_ids != undefined) {
            if (request.body.parent_category_ids != '') {
                var parent_category_ids = new RegExp(request.body.parent_category_ids, "i");
                addCondition.push({ parent_category_ids: parent_category_ids })
            }
        }

        if (request.body.color != undefined) {
            if (request.body.color != '') {
                var color = new RegExp(request.body.color, "i");
                addCondition.push({ color: color })
            }
        }

        if (request.body.material != undefined) {
            if (request.body.material != '') {
                var material = new RegExp(request.body.material, "i");
                addCondition.push({ material: material })
            }
        }


        if (request.body.sub_sub_category_ids != undefined) {
            if (request.body.sub_sub_category_ids != '') {
                var sub_sub_category_ids = new RegExp(request.body.sub_sub_category_ids, "i");
                addCondition.push({ sub_sub_category_ids: sub_sub_category_ids })
            }
        }

        if (request.body.sub_category_ids != undefined) {
            if (request.body.sub_category_ids != '') {
                var sub_category_ids = new RegExp(request.body.sub_category_ids, "i");
                addCondition.push({ sub_category_ids: sub_category_ids })
            }
        }


        if (request.body.is_best_selling !== undefined) {
            const bestSelling =
                request.body.is_best_selling === true ||
                request.body.is_best_selling === "true";

            addCondition.push({ is_best_selling: bestSelling });
        }

        if (request.body.is_featured !== undefined) {
            const featured =
                request.body.is_featured === true ||
                request.body.is_featured === "true";

            addCondition.push({ is_featured: featured });
        }

        if (request.body.is_new_arrival !== undefined) {
            const newArrival =
                request.body.is_new_arrival === true ||
                request.body.is_new_arrival === "true";

            addCondition.push({ is_new_arrival: newArrival });
        }
        //newly added
        if (request.body?.category_slug) {
            const subSubCat = await subsubcategoriesModal.findOne({
                slug: request.body.category_slug,
                deleted_at: null
            }).select("_id");

            if (subSubCat) {
                addCondition.push({
                    sub_sub_category_ids: subSubCat._id
                });
            }
        }

    }

    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}
    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var totalRecords = await productsModal.find(filter).countDocuments();
    var total_pages = Math.ceil(totalRecords / limit);


    let sortQuery = { _id: -1 }

    if (request.body.sort === "price_low") sortQuery = { sale_price: 1 }
    if (request.body.sort === "price_high") sortQuery = { sale_price: -1 }
    if (request.body.sort === "name_asc") sortQuery = { name: 1 }
    if (request.body.sort === "name_desc") sortQuery = { name: -1 }
    if (request.body.sort === "featured") sortQuery = { is_featured: -1 };
    if (request.body.sort === "new_arrival") sortQuery = { is_new_arrival: -1 };


    // var condition = {
    //     deleted_at: null
    // }

    // var current_page=1;

    // if(request.body.page){
    //     current_page=request.body.page;
    // }

    // var limit=2;
    // var skip=(current_page-1)*limit;



    // var totalRecords=await materialModel.find(condition).countDocuments();

    //     var total_pages=Math.ceil(totalRecords/limit);

    await productsModal.find(filter)
        .populate('parent_category_ids', 'name')
        .populate('sub_category_ids', 'name')
        .populate('sub_sub_category_ids', 'name')
        .populate('color', 'name')
        .populate('material', 'name')
        .skip(skip).limit(limit)
        .sort(sortQuery)
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _status: true,
                    _message: 'Record Found',
                    _pagination: {
                        current_page: current_page,
                        total_pages: total_pages,
                        total_records: totalRecords,
                    },
                    _image_path: process.env.product_image,
                    _data: result
                }

                response.send(output);
            } else {
                const output = {
                    _status: false,
                    _message: 'No Record Found',
                    _data: null
                }

                response.send(output);
            }
        })
        .catch((error) => {
            console.error("PRODUCT VIEW ERROR:", error);
            const output = {
                _status: false,
                _message: 'Something went wrong!',
                _data: null
            }

            response.send(output);
        })
}


exports.productdetails = async (request, response) => {
    // await colorModal.findOne({
    //     _id: request.body.id
    // })
    try {
        await productsModal.findOne({ slug: request.body.slug })
            .populate('parent_category_ids', 'name')
            .populate('sub_category_ids', 'name')
            .populate('sub_sub_category_ids', 'name')
            .populate('color', 'name')
            .populate('material', 'name')
            .then((result) => {
                if (result) {
                    const output = {
                        _status: true,
                        _message: 'Record Found',
                        _image_path: process.env.product_image,
                        _data: result
                    }

                    response.send(output);
                } else {
                    const output = {
                        _status: false,
                        _message: 'No Record Found',
                        _data: null
                    }

                    response.send(output);
                }

            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: 'Something went wrong!',
                    _data: null
                }

                response.send(output);
            })
    }

    catch (error) {
        const output = {
            _status: false,
            _message: 'Something went wrong! please send the required fields name',
            _data: null
        }

        response.send(output);
    }


}


//related product
exports.relatedProducts = async (request, response) => {

    let category_id = request.body.category_id;
    let exclude_id = request.body.exclude_id;

    if (!category_id) {
        const output = {
            _status: false,
            _message: 'Category id is required',
            _data: []
        };
        return response.send(output);
    }

    if (!exclude_id) {
        const output = {
            _status: false,
            _message: 'exclude id is required',
            _data: []
        };
        return response.send(output);
    }

    try {
        const result = await productsModal.find({
            parent_category_ids: category_id,
            _id: { $ne: exclude_id },
            deleted_at: null,
        }).limit(5);

        if (result.length > 0) {
            const output = {
                _status: true,
                _message: 'Record Found',
                _image_path: process.env.product_image,
                _data: result
            };
            return response.send(output);
        } else {
            const output = {
                _status: false,
                _message: 'No Record Found',
                _data: []
            };
            return response.send(output);
        }

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Something went wrong!',
            _data: []
        };
        return response.send(output);
    }
};

