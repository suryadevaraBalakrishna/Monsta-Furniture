const colorModal = require("../../models/Color");

exports.create = async (request, response) => {

    try {
        const data = {
            name: request.body.name,
            code: request.body.code,
            order: request.body.order,
        }

        const insertData = new colorModal(data);
        await insertData.save()
            .then((result) => {
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
            _message: 'Something went wrong! please send the required fields names',
            _data: null
        }

        response.send(output);
    }

}

exports.view = async (request, response) => {

    var current_page=1;
    var limit=4;
    var skip=(current_page-1)*limit;


    if(request.body!= undefined){
        var current_page=request.body.page ? request.body.page : current_page;
        var limit=request.body.limit ? request.body.limit : limit;
        var skip=(current_page-1)*limit;
    }

     const addCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [];

    if(request.body != undefined){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                var name = new RegExp(request.body.name,"i");
                orCondition.push({ name : name }, { code : name })
            }
        }
    }

    if(addCondition.length > 0){
        var filter = { $and : addCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }
    // End

        var totalRecords=await colorModal.find(filter).countDocuments();
        var total_pages=Math.ceil(totalRecords/limit);

    await colorModal.find(filter)
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
                    _pagination:{
                        current_page : current_page,
                        total_pages : total_pages,
                        total_records : totalRecords,
                    },
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

exports.details = async (request, response) => {
    //    await colorModal.findOne({
    //     _id: request.body.id
    // })
    try{
          if(request.body.id==''){
         return response.send({
        _status: false,
        _message: "Id Cannot be blank",
        _data: null,
      });
    }
       
    await colorModal.findById(request.body.id)
  .then((result) => {
            if (result) {
                const output = {
                    _status: true,
                    _message: 'Record Found',
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
    catch(error){
         const output = {
            _status: false,
            _message: 'Something went wrong! please send the required fields id',
            _data: null
        }

        response.send(output);
    }    
}

exports.update = async (request, response) => {

    
    try{
    const data = {
        name: request.body.name,
        code: request.body.code,
        order: request.body.order
    }

    if(!data.name || !data.code || !data.order){
        return response.send({
        _status: false,
        _message: "field cannot be empty",
        _data: null,
      });
    }




    await colorModal.updateOne({
        _id: request.params.id
    }, {
        $set: data
    },
)
        .then((result) => {
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

    catch(error){
           const output = {
            _status: false,
            _message: 'Something went wrong! please send the required fields name',
            _data: null
        }

        response.send(output);
    }

}

exports.changeStatus = async (request, response) => {

    try{
        
    await colorModal.updateMany({
        _id: {
            $in: request.body.id
        }
    },[ {
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
   catch(error){
     const output = {
            _status: false,
            _message: 'Something went wrong! please send the required fields id',
            _data: null
        }

        response.send(output);
   }




}

exports.destroy = async (request, response) => {

    try{
    await colorModal.updateMany({
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
     catch(error){
     const output = {
            _status: false,
            _message: 'Something went wrong! please send the required fields id',
            _data: null
        }

        response.send(output);
   }

}