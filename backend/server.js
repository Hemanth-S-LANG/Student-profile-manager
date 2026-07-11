import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Profile from "./models/login.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";// for JWT SECRET KEY From .env file
import auth from "./middleware/auth.js";
await mongoose.connect("mongodb://localhost:27017/studentProfile");
dotenv.config();
// Initialize the Express application
const app = express();
app.use(cors());
app.use(express.json());

// Define the port number
const PORT = 3000;

// Create a GET route handler for the root URL ('/')
app.get('/', (req, res) => { 
    res.send('Hello World!');
});
app.post('/login',async(req,res)=>{
    const user=await Profile.findOne({username:req.body.username});
    if(!user){// used to check if user name is correct or wrong
        res.send("user not found");}
   const isMatch=await bcrypt.compare(req.body.password,user.password)
   if(!isMatch){
    return res.status(401).json({
       message: "wrong password"
    });
   }
    else{
        // res.json(user);
        const token=jwt.sign({
            id:user._id // jwt consider it has a key value pair the key can be of any name u want that is in place of id u can use any other name if u want 
        },process.env.JWTSecretKey)
    res.json({
    token
});
    }
})
app.post('/register',async(req,res)=>{
    const hashedPassword=await bcrypt.hash(req.body.password,10);
    const user1=new Profile({
        ...req.body,// ... is the spread operator explaination at below line  
    password:hashedPassword});
    await user1.save();
    res.json(user1);
})
app.get('/profile',auth,async(req,res)=>{
    const user=await Profile.findById(req.user.id);
    res.json(user);
})
app.delete('/profile',auth,async(req,res)=>{
    const user=await Profile.findByIdAndDelete(req.user.id);
    res.send("account deleted successfully");
})
// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});










// What does ...req.body do?

// Suppose frontend sends:

// {
//     username:"hemanth",
//     password:"abcde",
//     name:"Hemanth S",
//     age:19,
//     course:"CSE"
// }

// Then:

// {
//     ...req.body,
//     password:hashedPassword
// }

// becomes:

// {
//     username:"hemanth",
//     password:"$2b$10$...",
//     name:"Hemanth S",
//     age:19,
//     course:"CSE"
// }


// explaination for register end point :- for these 2 ines:
//  1)...req.body, 2)password:hashedPassword});
// {
//     ...req.body,
//     password: hashedPassword
// }over here if we are selecting everything from req.body then we are selecting even the password which is already selected then why one more time and which one will mongodb store?

// Excellent question. This is exactly how the spread operator works.

// Suppose:

// req.body = {
//     username:"hemanth",
//     password:"abcde",
//     name:"Hemanth S",
//     age:19
// }

// Now:

// {
//     ...req.body,
//     password: hashedPassword
// }

// is expanded by JavaScript to:

// {
//     username:"hemanth",
//     password:"abcde",
//     name:"Hemanth S",
//     age:19,

//     password:"$2b$10$abcxyz..."
// }

// Now there are two password keys.

// When JavaScript sees duplicate keys in an object:

// {
//     a:1,
//     a:2
// }

// the last one wins.

// So it becomes:

// {
//     a:2
// }

// Similarly:

// {
//     username:"hemanth",
//     password:"abcde",
//     name:"Hemanth S",
//     age:19,

//     password:"$2b$10$abcxyz..."
// }

// finally becomes:

// {
//     username:"hemanth",
//     password:"$2b$10$abcxyz...",
//     name:"Hemanth S",
//     age:19
// }

// So MongoDB stores:

// {
//   "username":"hemanth",
//   "password":"$2b$10$abcxyz...",
//   "name":"Hemanth S",
//   "age":19
// }

// and the original password "abcde" is discarded.

// You could also write it more explicitly:

// const user1 = new Profile({
//     username:req.body.username,
//     password:hashedPassword,
//     name:req.body.name,
//     age:req.body.age,
//     course:req.body.course,
//     collegeName:req.body.collegeName,
//     skills:req.body.skills
// });

// This does exactly the same thing.

// We use:

// ...req.body

// because it's shorter and automatically includes all fields.

// Think of it as:

// Take everything from req.body
//             ↓
// Replace only password
//             ↓
// Save to MongoDB