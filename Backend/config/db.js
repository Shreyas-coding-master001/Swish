const mongoose = require('mongoose');

const connectDB = async function(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase Connected!!");
    }catch(err){
        console.log("MongoDB Connection failed : \n",err);   
    }
}

module.exports = connectDB;