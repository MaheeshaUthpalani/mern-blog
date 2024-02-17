import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.route.js';
import { errorHandler } from '../utils/error.js';

dotenv.config();

//mongodb connection

mongoose
  .connect(process.env.MONGO)
  .then(() => {
     console.log('MongoDb is connected');
   })
   .catch((err) => {
      console.log(err);
   });


const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Routes
app.use('/api/contact', contactRoutes);

app.use(express.json());

//error handling middleware
/*app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internet server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});*/

//use errorHandler middleware
app.use(errorHandler);