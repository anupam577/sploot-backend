
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

        
        const resultData={
            statusCode:null,
            data:{

             data:result,
            
            }
        
        }

        return res.status(201).json({ ...resultData,statusCode:201 });
    } catch (err) {
        console.log({statusCode:500,error:err.message});
    }
}



// get all posts
export const getAllPosts = async (request, response) => {


    try {

        const posts = await Post.find().populate("postedBy");
        const resultData={
            statusCode:null,
            data:{

             data:posts,
            
            }
        
        }

        return response.status(200).json({...resultData,statusCode :200});
    } catch (error) {
        return response.status(500).json({ statusCode:500,error:err.message })
    }
}