import mongoose from "mongoose";
import colors from "colors";
const connectdb=async()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_DB)
        console.log(`server connected to moongoose ${mongoose.connection.host}`.bgRed.white)
    } catch (error) {
        console.log(`Mongoose Error ${error}`.bgRed.white)
    }
}

export default connectdb;