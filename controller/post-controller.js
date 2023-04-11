
import Post from '../model/post.js';

// Create Posts
export const createPost = async (req, res) => {

    const { title, description } = req.body;
    const { userId } = req.params;
    try {
        const newPost = new Post({
            title,
            description,
            postedBy: userId
        });
        const result = await newPost.save();

        return res.status(201).json({ ...result._doc });
    } catch (err) {
        console.log(err);
    }
}



// get all posts
export const getAllPosts = async (request, response) => {


    try {

        const posts = await Post.find().populate("postedBy");
        let result = {
            posts: posts
        }

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error })
    }
}