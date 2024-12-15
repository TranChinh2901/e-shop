const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModel = require("../models/userModel")
const JWT = require("jsonwebtoken")

//****************************************REGISTER********************************************* */
const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        if(!name){
            return res.send({error: 'Name is required'})
        };
        if(!email){
            return res.send({message: 'Email is required'})
        }
        if(!password){
            return res.send({message: 'Password is required'})
        }
        if(!phone){
            return res.send({message: 'Phone is required'})
        }
        if(!address){
            return res.send({message: 'Address is required'})
        }
        if(!answer){
            return res.send({message: 'answer is required'})
        }
        //find user
        const exisitingUser = await userModel.findOne({email})
        
        if(exisitingUser){
            return res.status(200).send({
                success: false,
                message: 'Already register please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name, 
            email, 
            phone, 
            address, 
            password: hashedPassword,
            answer
        }).save()

        res.status(201).send({
            success:true,
            message:'User register successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registering',
            error
        });
        
    }
}

//******************************************LOGIN****************************************** */

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',   
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registerd'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            });
        }

        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"}
    );

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'error in login',
            error,
        });
    }
}


const forgotPasswordController = async (req,res) => {
try {
    const {email, answer, newPassword} = req.body
    if(!email) {
        res.status(400).send({message: 'email is required'})
    }
    if(!answer) {
        res.status(400).send({message: 'answer is required'})
    }
    if(!newPassword) {
        res.status(400).send({message: 'newPassword is required'})
    }

    //check
    const user = await userModel.findOne({email, answers})

    if(!user){
        return res.status(404).send({
            success: false,
            message: 'wrong email or answers'
        })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message: 'Password reset successfully' 
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error
    })
    
}
}




//****************************************TESTCONTROLLER******************************************** */

const testController = (req, res) => {
    try {
        res.send('testController')
    } catch (error) {
        console.log(error);
    res.send({ error });
    }
    
}
module.exports = {registerController, loginController, testController, forgotPasswordController}