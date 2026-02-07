const newsletterModal=require('../../models/Newsletter');

exports.create = async (request, response) => {

    try {
        const data = request.body;

        const insertData = new newsletterModal(data);
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