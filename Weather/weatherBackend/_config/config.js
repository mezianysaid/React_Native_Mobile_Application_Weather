const mongoose=require('mongoose');
require('dotenv').config()
const db = process.env.connectdb
const ConnectToDB=async () =>{
    try {
         await mongoose.connect(
             db,
             {
                 useNewUrlParser:true
             }
         );
         console.log("connected to DB ....");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports=ConnectToDB;