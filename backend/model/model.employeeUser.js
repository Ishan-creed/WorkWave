import mongoose from 'mongoose';

const EmpUserModel = new mongoose.Schema({

    name : { 
        type : String
    },

    email: {

        type: String,
        required : true,
        validate: {
            validator: function(value) {
                return /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }

    },

    password : {
               
        type: String,
        required: true,
        minlength: 8,

    },

    employeeId: {

        type : Number
    },

    company : {

        type: mongoose.Schema.Types.ObjectId,
        ref : 'orgUserModel'

    },

    CIN :{

        type : Number
    },

    branch : {
        
        type: String

    },


});

const empUserModel = new mongoose.model('myEmpuser',EmpUserModel);

export default empUserModel;