import mongoose from "mongoose";
export const connectMongoDB = () => {

    mongoose.connect(process.env.MONGO_URI!, {
    }).then(() => {
        console.log('Connnect MongoDB Successfully');
    }).catch((err: any) => {
        console.log(err.message)
    })
}