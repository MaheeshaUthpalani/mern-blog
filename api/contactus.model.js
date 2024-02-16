import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    }, {timestamps: true}
);

const contactus = mongoose.model('contactus', feedbackSchema);

export default contactus;