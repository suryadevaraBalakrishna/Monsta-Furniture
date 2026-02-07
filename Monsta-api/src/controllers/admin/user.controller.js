require('dotenv').config()
const user = require('../../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { request, response } = require('express');
const saltRounds = 10;
const nodemailer = require("nodemailer");
const userModal = require('../../models/User');

//Register API
exports.register = async (request, response) => {

    var existingUser = await user.findOne({ email: request.body.email, deleted_at: '',role_type:'Admin'})

    if (existingUser) {
        const output = {
            _status: false,
            _message: 'Email Already Exists',
            _data: null,
        }
        return response.send(output);
    }

    const data = {
        name: request.body.name,
        email: request.body.email,
        password: await bcrypt.hash(request.body.password, saltRounds),
        mobile_number: request.body.mobile_number,
        role_type:'Admin'
    }

    try {

        const insertData = new user(data);
        await insertData.save()
            .then((result) => {

                var token = jwt.sign({ userData: data }, process.env.KEY_VALUE)
                const output = {
                    _status: true,
                    _message: 'User Inserted',
                    _token: token,
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



//Login API
exports.login = async (request, response) => {
    var existingUser = await user.findOne({ email: request.body.email, deleted_at: '',role_type:'Admin' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: 'Invalid Email',
            _data: null,
        }
        return response.send(output);
    }

    if (await bcrypt.compare(request.body.password, existingUser.password)) {
        var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE)

        if (existingUser.status == false) {
            const output = {
                _status: false,
                _message: 'Account is deactivated',
                _data: null,
            }
            return response.send(output);
        }

        const output = {
            _status: true,
            _message: 'Login Successful',
            _token: token,
            _data: existingUser
        }

        response.send(output);
    }
    else {
        const output = {
            _status: false,
            _message: 'Invalid Password',
            _data: null,
        }
        return response.send(output);
    }

}

//View Profile API
exports.viewProfile = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await user.findOne({_id:decoded.userData._id,role_type:'Admin'});

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }


        const output = {
            _status: true,
            _message: 'Profile Fetched Successfuly',
            _token: token,
             _image_path: process.env.user_image,
            _data: userData
        }

        response.send(output);

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }

}


//View All Users
exports.viewUser= async(request,response)=>{
    
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
    
            var totalRecords=await userModal.find(filter).countDocuments();
            var total_pages=Math.ceil(totalRecords/limit);
    
        await userModal.find(filter)
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



//Update Profile
exports.updateProfile = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData =   await user.findOne({_id:decoded.userData._id,role_type:'Admin'});

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

        const updateData = request.body;

        if (request.file) {
            updateData.image = request.file.filename;
        }



        var updateUser = await user.updateOne({
            _id: decoded.userData._id
        }, {
            $set: updateData
        })

        const output = {
            _status: true,
            _message: 'Profile Updated Successfuly',
            _data: updateUser,
        }

        response.send(output);

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }

}



//Change Password
exports.changePassword = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData =   await user.findOne({_id:decoded.userData._id,role_type:'Admin'});

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

        var verify_password = await bcrypt.compare(request.body.current_password, userData.password);

        if (!verify_password) {
            const output = {
                _status: false,
                _message: 'Incorrect Password',
                _data: null
            }

            return response.send(output);
        }

        if (request.body.current_password === request.body.new_password) {
            const output = {
                _status: false,
                _message: 'Current Password and New password should not be same',
                _data: null
            }

            return response.send(output);
        }

        if (request.body.new_password != request.body.confirm_password) {
            const output = {
                _status: false,
                _message: 'Confirm Password and New password should be same',
                _data: null
            }

            return response.send(output);
        }

        var password = await bcrypt.hash(request.body.new_password, saltRounds)


        var updateUser = await user.updateOne({
            _id: decoded.userData._id
        }, {
            $set: {
                password: password
            }
        })

        const output = {
            _status: true,
            _message: 'Password Updated Successfuly',
            _data: updateUser
        }

        response.send(output);

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }

}



//forgot Password
exports.forgotPassword = async (request, response) => {
    var existingUser = await user.findOne({ email: request.body.email, deleted_at: '',role_type:'Admin' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: 'Invalid Email',
            _data: null,
        }
        return response.send(output);
    }

    var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE, {
        expiresIn: '1h'
    })

    // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'Monsta API' + process.env.EMAIL_USER,
        to: existingUser.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password http://localhost:5173/reset-password?token=${token}`, // Plain-text version of the message
    };

    // Send the email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return response.send({
                _status: false,
                _message: 'Error sending email',
                _data: error
            });
        } else {
            return response.send({
                _status: true,
                _message: 'Password reset email sent successfully',
                _data: null
            });
        }
    });


}


// reset password
exports.resetPassword= async(request,response)=>{
      var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await user.findOne({_id:decoded.userData._id,role_type:'Admin'});
          
        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

      
       
        if (request.body.new_password != request.body.confirm_password) {
            const output = {
                _status: false,
                _message: 'Confirm Password and New password should be same',
                _data: null
            }

            return response.send(output);
        }

        var password = await bcrypt.hash(request.body.new_password, saltRounds)


        var updateUser = await user.updateOne({
            _id: decoded.userData._id
        }, {
            $set: {
                password: password
            }
        })

        const output = {
            _status: true,
            _message: 'Password Reset Successfuly',
            _data: updateUser
        }

        response.send(output);

    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }
}


// exports.register = (request, response) => {
// var token=jwt.sign({userData:'Welcome to Ws'},process.env.KEY_VALUE)
//     const output = {
//         _status: false,
//         _message: 'Register User',
//         _data: token,
//     }

//     response.send(output);
// }


// exports.login = (request, response) => {
//     var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6IldlbGNvbWUgdG8gV3MiLCJpYXQiOjE3NjY5MzE2MTR9.zOkVYJ7HudXBU7T74bImUsaFWCQggrGfuYpGsraXTJI';
//     var verify=jwt.verify(token,process.env.KEY_VALUE);
//     const output = {
//         _status: false,
//         _message: 'Login User',
//         _data: verify,
//     }

//     response.send(output);
// }