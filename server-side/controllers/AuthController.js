import User from "../models/User.js";

export const checkUser = async(req,res,next)=>{
    try {
        const{email} = req.body;
        if(!email){
            return res.json({msg:"Email is Required",status:false});
        }
        const user =  await User.findOne({where: {email:email}});
        if(!user){
            return res.json({msg:"User Not found", status:false});
        }
        else{
            return res.json({msg:"User Found", status:true, data:user})
        }
    } catch (error) {
        next(err)
    }
};

export const onBoardUser = async(req,res,next)=>{
    try {
        const {email,name,about,image:profilePicture} = req.body;
        if(!email || !name || !profilePicture){
            return res.send("Email, Name and Image are Required.");
        }
        const data = await User.create({ email,name,about,profilePicture });
        return res.json({msg:"success", status:true, data:data})


    } catch (error) {
        console.log(error);
    }
}