import mongoose from "mongoose";

const newProject = new mongoose.Schema({


    CID : { 

        type : Number
        
    },

    projectName : {

        type: String

    },

    projectDuration:{
        
        type : Date

    },

    projectDescription:{

        type: String

    },

    headCount:{
        
        type: Number

    },

    budget:{

        type : Number

    },

    stockRatio : {

        type : Number

    },

    projectSectors:{

        type : Array

    },

    report : {

        type: String

    },

    goals : {

        type : Array

    }

});

const myProject = new mongoose.model('newProject',newProject);

export default myProject;