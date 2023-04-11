import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


import User from '../model/user.js';


dotenv.config();

// userSignUp
export const singupUser = async (req, res) => {
    const { name, age, email, password } = req.body;

    // check all the missing fields.
    if (!name || !age || !email || !password)
        return res
            .status(400)
            .json({statusCode:400, error: `Please enter all the required field.` });

    // name validation.
    if (name.length > 25)
        return res
            .status(400)
            .json({statusCode:400, error: "name can only be less than 25 characters" });

    // email validation.
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailReg.test(email))
        return res
            .status(400)
            .json({statusCode:400, error: "please enter a valid email address." });

    // validation of password.
    if (password.length < 6)
        return res
            .status(400)
            .json({statusCode:400, error: "password must be atleast 6 characters long" });
    try {
        const doesUserAlreadyExist = await User.findOne({ email });

        if (doesUserAlreadyExist)
            return res.status(400).json({
                statusCode:400,
                error: `a user with that email [${email}] already exists so please try another one.`,
            });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, age, email, password: hashedPassword });

        // save the user.
        const result = await newUser.save();

       



        result._doc.password = undefined;

        const resultData={
            statusCode:null,
            data:{
             data:result._doc
            }
        
        }

        return res.status(201).json({ ...resultData,statusCode:201 });
    } catch (err) {
        console.log(err);
        return res.status(500).json({statusCode:500, error: err.message });
    }
};

// userLogin
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({statusCode:400, error: "please enter all the required fields!" });

    // email validation.
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailReg.test(email))
        return res
            .status(400)
            .json({statusCode:400, error: "please enter a valid email address." });

    try {
        const doesUserExits = await User.findOne({ email });

        if (!doesUserExits)
            return res.status(400).json({statusCode:400, error: "Invalid email or password!" });

        // if there were any user present.
        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        );

        if (!doesPasswordMatch)
            return res.status(400).json({statusCode:400, error: "Invalid email or password!" });

        const payload = { _id: doesUserExits._id };
        const token = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
            expiresIn: "1h",
        });

        const user = { ...doesUserExits._doc, password: undefined };
         
        const resultData={
            statusCode:null,
            data:{

             data:user,
             token
            }
        
        }



        return res.status(200).json({ ...resultData,statusCode:200});
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ statusCode:500, error: err.message });
    }
}




// Update Profile (name and Age)
export const updateProfile = async (req, res) => {
    const id = req.params.userId;

    if (!id) return res.status(400).json({statusCode:400, error: "no id specified." });

    try {

        const updatedData = { ...req.body, id: undefined };
        const result = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        const resultData={
            statusCode:null,
            data:{

             data:result,
            
            }
        
        }

        return res.status(200).json({ ...resultData,statusCode: 200});
    } catch (err) {

        console.log({statusCode:500,error:err.message});
    }
}