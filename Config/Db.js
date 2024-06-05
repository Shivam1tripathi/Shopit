import mongoose from "mongoose";
import Color from "colors";
const Dbconnection =async()=>{
    try{
        const conn=await mongoose.connect(process.env.MongoDb_URL);
        console.log(`Connection made successfully ${conn.connection.host}`.bgGreen.white);
    }catch(error){
console.log(`Connection failed ${error}`.bgRed.white);
    }
}
export default Dbconnection;