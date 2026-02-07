const productsModal = require('../../models/Product');
const Category = require('../../models/Categories');
const SubCategory = require('../../models/SubCategories');
const SubSubCategory = require('../../models/SubSubCategories');
require('dotenv').config()
var slugify = require('slugify');

// const generateUniqueSlug= async (model,baseSlug)=>{
//     let count=0;
//     let actualSlug=baseSlug;

//     while(await (model.findOne({slug:actualSlug}))){
//         count++;
//         actualSlug= `${baseSlug}-${count}`;
//     }

//     return actualSlug;
// }

exports.create = async (request, response) => {

    var slug_detail = slugify(request.body.name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    })

    try {
        // const data = {
        //     name: request.body.name,
        //     order: request.body.order,
        //     image: request.file.filename,
        //     // slug: await generateUniqueSlug(productsModal,slug_detail)
        //       slug:slug_detail
        // }

        const data = request.body;

        data.slug = slug_detail;

        if (request.files && request.files.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files && request.files.images) {
            data.images = request.files.images.map(file => file.filename);
        }



        const insertData = new productsModal(data);
        await insertData.save()
            .then(async (result) => {

                if (request.body.parent_category_ids != undefined && request.body.parent_category_ids != '') {
                    await Category.updateMany({
                        _id: request.body.parent_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                if (request.body.sub_category_ids != undefined && request.body.sub_category_ids != '') {
                    await SubCategory.updateMany({
                        _id: request.body.sub_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                if (request.body.sub_sub_category_ids != undefined && request.body.sub_sub_category_ids != '') {
                    await SubSubCategory.updateMany({
                        _id: request.body.sub_sub_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                const output = {
                    _status: true,
                    _message: 'Record Inserted',
                    _data: result
                }

                response.send(output);

            })
            .catch((error) => {

                console.log(error);

                var errorMessages = [];

                for (err in error.errors) {
                    errorMessages.push(error.errors[err].message);
                }


                const output = {
                    _status: false,
                    _message: 'Something went wrong!',
                    _data: null,
                    _error_messages: errorMessages
                }

                response.send(output);
            })

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Something went wrong!',
            _data: null
        }

        response.send(output);
    }
}


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

         if(request.body.parent_category_ids != undefined){
            if(request.body.parent_category_ids != ''){
                var parent_category_ids = new RegExp(request.body.parent_category_ids,"i");
                addCondition.push({ parent_category_ids: parent_category_ids })
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
        .sort({
            order: 'asc'
        })
        .sort({
            _id: 'desc'
        })
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


exports.details = async (request, response) => {
    // await colorModal.findOne({
    //     _id: request.body.id
    // })
    try {
        await productsModal.findById(request.body.id)
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


exports.productdetails = async (request, response) => {
    // await colorModal.findOne({
    //     _id: request.body.id
    // })
    try {
        await productsModal.findById(request.body.id)
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





exports.update = async (request, response) => {

    var slug_detail = slugify(request.body.name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    })


    try {
        // const data = {
        //     name: request.body.name,
        //     order: request.body.order,

        // }


        const data = request.body;

        data.slug = slug_detail;

        if (request.files && request.files.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files && request.files.images) {
            data.images = request.files.images.map(file => file.filename);
        }



        if (!data.name || !data.order) {
            return response.send({
                _status: false,
                _message: "field cannot be empty",
                _data: null,
            });
        }


        await productsModal.updateOne({
            _id: request.params.id
        }, {
            $set: data
        })
            .then(async (result) => {

                
                if (request.body.parent_category_ids != undefined && request.body.parent_category_ids != '') {
                    await Category.updateMany({
                        _id: request.body.parent_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                if (request.body.sub_category_ids != undefined && request.body.sub_category_ids != '') {
                    await SubCategory.updateMany({
                        _id: request.body.sub_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                if (request.body.sub_sub_category_ids != undefined && request.body.sub_sub_category_ids != '') {
                    await SubSubCategory.updateMany({
                        _id: request.body.sub_sub_category_ids
                    },
                        {
                            $push: {
                                product_ids: {
                                    $each: [result._id]
                                }
                            }
                        })
                }


                const output = {
                    _status: true,
                    _message: 'Record Updated',
                    _data: result
                }

                response.send(output);

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

exports.changeStatus = async (request, response) => {


    try {

        await productsModal.updateMany({
            _id: {
                $in: request.body.id
            }
        }, [{
            $set: {
                status: {
                    $not: "$status"
                }
            }
        }
        ]
        )
            .then((result) => {
                const output = {
                    _status: true,
                    _message: 'Status Updated',
                    _data: result
                }

                response.send(output);

            })
            .catch((error) => {
                console.log(error);
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
            _message: 'Something went wrong! please send the required fields id',
            _data: null
        }

        response.send(output);
    }

}

exports.destroy = async (request, response) => {
    try {
        await productsModal.updateMany({
            _id: {
                $in: request.body.id
            }
        }, {
            $set: {
                deleted_at: Date.now()
            }
        })

            .then((result) => {
                const output = {
                    _status: true,
                    _message: 'Record Deleted',
                    _data: result
                }

                response.send(output);

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