import express, { Router } from 'express';
const router = express.Router();
import {companyUserSignIn,companyUserSignUp,employeeUserSignIn,employeeUserSignUp} from '../controllers/controller.addUser.js';
import { newProject } from '../controllers/controller.newProjectController.js';

router.get("/", (req, res) => {
    res.send("API Working");
  });
  
// Authentication Routes :-

router.post('/orgRegister',companyUserSignUp);
router.post('/orgSignin',companyUserSignIn);
router.post('/empRegister',employeeUserSignUp);
router.post('/empSignIn',employeeUserSignIn);

// Project Routes :- 

router.post('/newProject',newProject);


export default router;