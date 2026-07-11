import mongoose from "mongoose"
const dataSchema=new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    age:Number,
    course:String,
    collegeName:String,
    skills:[String]
});
const Profile=mongoose.model("studentProfile",dataSchema);
export default Profile;
