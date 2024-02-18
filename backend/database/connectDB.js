import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


const Connection = () => {
  
  mongoose
  .connect("mongodb+srv://myUser:QollCmcgTolshkuJ@cluster0.wk0dk.mongodb.net/WorkWave?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

};

export default Connection;