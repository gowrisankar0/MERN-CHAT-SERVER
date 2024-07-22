const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = "mongodb+srv://gowrisankar:gowri@gowrisankar.5gykdnp.mongodb.net/chat-MERN?retryWrites=true&w=majority&appName=GowriSankar"


const connectDb = async()=>{
    try {

        const con = await mongoose.connect(url);
        console.log(`DB is connected ${con.connection.host}`);
        
    } catch (error) {
        console.log(error);
    }
};


module.exports = connectDb;