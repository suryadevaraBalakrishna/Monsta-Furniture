const { request, response } = require('express');
const categoriesModal = require('../../models/Categories');
const subcategoriesModal=require('../../models/SubCategories');
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
    }

    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}
    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var totalRecords = await categoriesModal.find(filter).countDocuments();
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

    await categoriesModal.find(filter)
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
                    _image_path: process.env.category_image,
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


exports.menuCategories = async (request, response) => {
  try {
    const categories = await categoriesModal.find({ deleted_at: null }).select('_id name slug order');
    const subcategories = await subcategoriesModal.find({ deleted_at: null }).select('_id name slug parent_category_id order');
    const subsubcategories = await subsubcategoriesModal.find({ deleted_at: null }).select('_id name slug sub_category_id order');

    const menu = categories.map(category => {

     
      const categorySubCategories = subcategories.filter(sub =>
        String(sub.parent_category_id?._id || sub.parent_category_id) ===
        String(category._id)
      );

    
      const formattedSubCategories = categorySubCategories.map(sub => {

        const subSubCats = subsubcategories.filter(subsub =>
          String(subsub.sub_category_id?._id || subsub.sub_category_id) ===
          String(sub._id)
        );
        
        return{
            ...sub.toObject(),
             sub_sub_categories:subSubCats,
        }
     
      });

      return{
        ...category.toObject(),
         sub_categories:formattedSubCategories,
      }

    
     
    });

    return response.send({
      _status: true,
      _message: 'Menu Categories',
      _data: menu
    });

  } catch (error) {
    return response.send({
      _status: false,
      _message: 'Something went wrong',
      _data: []
    });
  }
};
