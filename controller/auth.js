 const User = require("../models/User");
 const bcrypt = require("bcrypt");
const genarateTokenSetcookie = require("../utils/generateToken");
 
 
 const signUp = async(req,res) =>{
    try {


         const {fullName,userName,password,confirmPassword,gender} = req.body;

        if(password!=confirmPassword){
            return res.status(400).json("Password does not match")
        }

         const user = await User.findOne({userName});

         if(user){
            return res.status(400).json("user already exist")
         }


          const salt = await bcrypt.genSalt(10);

          const hashPassword = await bcrypt.hash(password,salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

          
        const newUser = new User({
            fullName,
            userName,
            password:hashPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        });


        if(newUser){
             genarateTokenSetcookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                fullName:newUser.fullName,
                userName:newUser.userName,
                profilePic:newUser.profilePic,

            })
        }else{
            res.status(400).json({error:"invalid user Data"})
        }

    

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
};




 const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid userName or password" });
		}

		genarateTokenSetcookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const logout = async (req,res)=>{
    try {

         res.cookie("jwt","",{maxAge:0})
         res.status(200).json("logged out succesfully");
        
    } catch (error) {

        console.log("error in logout controller",error.message);
        res.status(500).json({error:"internal server error"})
        
    }
}

module.exports = {signUp,login,logout};