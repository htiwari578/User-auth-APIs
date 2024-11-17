import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


//  register // create
export const register = async (req,res) => {

    try {
        const {fullname , email , password }  = req.body;
        if(!fullname || !email || !password) {
            return res.status(400).json({
                message:"Something Missing",
                success:false
            });

        };
        // user user alredy exit or not if exist we are finding through email
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message:"email already exist",
                success:false
            })
        }
        // hahed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // now create user 
        await User.create ({
            fullname, 
            email, 
            password:hashedPassword
        });

        return res.status(201).json({
            message:"Account created succesfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// login// read

export const login = async (req,res) => {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({
                    message:"something is missing",
                    success:false
                });
            };

            // checking user detail saved in data base
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"Incorrect email or password",
                    success:false
                });
            };
            // check if user password matched or not

            const isPasswordMtach = await bcrypt.compare(password,user.password);

        if(!isPasswordMtach){
            return res.status(400).json({
                message:"Wrong password",
                succes:false
            })
        };
        // cerating token token
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user ={
            _id:user._id,
            fullname:user.fullname,
            email:user.email

        }
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true,
            sameSite:'strict'
        }).json({
            message:`welcome back ${user.fullname}`,
            success:true
        })

        } catch (error) {
            console.log(error);
        }
}
// logout
export const logout = async (req,res) =>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logout succesful",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


// update 

export const update = async (req,res)=>{
    try {
        const {fullname,email} = req.body;
        if(!fullname || !email){
            return res.status(400).json({
                message:"something is missing",
                success:true
            })
        };
        // here checking user authenticated or not
        const userId = req.id;
        // finding user
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        // updating 
        user.fullname = fullname,
        user.email = email
        await user.save();


        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }
        return res.status(200).json({
            message:"Updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}