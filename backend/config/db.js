import mongoose from "mongoose";

const connecctDB = async()=> {
    try {
        console.log('hii')
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected successfully`);
    } catch (error) {
        console.log(error);
    }
}

export default connecctDB;