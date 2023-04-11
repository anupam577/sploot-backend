import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true
    }

});


const user = mongoose.model('user', userSchema);

export default user;