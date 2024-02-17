import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.route.js';
import { errorHandler } from '../utils/error.js';
import contactus from '../contactus.model.js';

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

//error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internet server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await contactus.find();
        res.status(400).json({
            success:true,
            contacts: contacts
        });
    }catch (error) {
        next(error);
    }

};

export const createContact = async (req, res, next) => {
    const {name, email, contactNo, message } =req.body;

try {
    if (
        !name ||
        !email ||
        !contactNo ||
        !message 
    )
    return next(errorHandler(400, 'All fields are required'));

    const newContact = new contactus ({
        name,
        email,
        contactNo,
        message
    });

    await newContact.save();
    res.status(201).json ({
        success: true,
        message: 'contact created successfully',
        contact: newContact
    });
} catch (error) {
    next (error);
   }
};