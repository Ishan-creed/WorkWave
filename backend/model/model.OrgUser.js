import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const OrgUserModel = new mongoose.Schema({

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

    password: {
        type: String,
        required: true,
        minlength: 8,
    },

    CIN :{
        type : Number
    },

    employeeCount:{
        type: Number
    },

    industryType:{

        type: String,
        enum : ['Software','Agriculture','IOT','Defence']

    },

    branch : {
        
        type: String

    }

});

const orgUserModel = new mongoose.model('myOrgUser',OrgUserModel);

export default orgUserModel;