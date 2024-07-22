const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protectRoute = async (req,res,next)=>{

    try {

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"unAuthorized no token"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"unAuthorized invalid token"})
        }
      

        const user = await User.findById(decoded.userId).select("-password");


        if(!user){
            return res.status(404).json({error:"user not found"})
        }
            req.user=user;
            next();
        
    }catch(error) {

        console.log("error in protect route",error.message);

        res.status(500).json({error:"Internal server error"})
        
    }
};


module.exports = {protectRoute}