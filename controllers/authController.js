import userModel from "../models/userModel.js";

export const registerController=async(req,res,next)=>{
try {
    const {name,email,password}=req.body;

    //validation
    // if(!name){
    //     next('name is required');

    // }
    // if(!email && !password){
    //     next('email or password is required');
    // }
    const existinguser = await userModel.findOne({email});
    if(existinguser){
        next('"email already exists"');
    }

    const user=await userModel.create({name,email,password});
    const token=user.createJWT();
    res.status(201).send({
        success: true,
        message:'User registered successfully',
        user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location,
            
        },
        token
    })

} catch (error) {
   next(error)
    
}
}
export const loginController = async(req, res,next) =>{
const {email,password} = req.body

if(!email ||!password){
    next('please enter email or password')
}
const user= await userModel.findOne({email}).select("+password")
if(!user){
    next('invalid username or passowrd')

}
const isMatch =await user.comparePassword(password)
if(!isMatch){
    next('invalid username or password')
}
user.password=undefined;
const token=user.createJWT();
res.status(200).json({
    success:true,
    message:'login Successfully',
    user,token
})
}