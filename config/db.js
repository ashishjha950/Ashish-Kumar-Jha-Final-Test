import mongoose from "mongoose";

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('database connected')
    })
    .catch((err)=>{
        console.log('error occured',err)
    })
}

export default dbConnect;