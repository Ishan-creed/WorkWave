import mongoose from "mongoose";
import myProject from "../model/model.newProject.js";


export const newProject = async (req,res) => {

    const { projectName, projectDuration , projectDescription, headCount, budget , stockRatio , projectSectors, report , goals , CID } = req.body;

     try { 

        const newProject = new myProject({

            projectName,
            projectDuration,
            projectDescription,
            headCount,
            budget,
            stockRatio,
            projectSectors,
            report,
            goals,
            CID

        });

        await newProject.save();
        return res.status(200).json({message: "Project has been initialised :-) "});

     }

     catch(error) {

        console.error("Error in creating the project",error);
        return res.status(500).json({error:"Project Creation faiiled ;)"});
        
     }

}