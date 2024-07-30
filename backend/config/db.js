const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("process.env.MONGO_URIprocess.env.MONGO_URI",process.env.MONGO_URI)
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline);
    }catch (error){
        console.log("process.env.MONGO_URIprocess.env.MONGO_URI111",process.env.MONGO_URI)
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;