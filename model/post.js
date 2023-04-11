import mongoose from 'mongoose';

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
});


const post = mongoose.model('post', ArticleSchema);

export default post;