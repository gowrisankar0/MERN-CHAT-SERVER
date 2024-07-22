const express=require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const messageRoutes = require("./routes/message")
const userRoutes = require("./routes/user")
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors")
dotenv.config();

connectDb();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("Api is working")
})



app.listen(PORT,()=>{
    console.log(`Server is up and runnig ${PORT}`);
})