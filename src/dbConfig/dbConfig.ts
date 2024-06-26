import mongoose from "mongoose";


export async function connect() {
    try {

        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected',() => {
            console.log("Database connected successfully");
        })
        connection.on('error',(err) => {
            console.log("Error connecting to database, please make sure database is up and running" + err);
            process.exit();
        })
        
    } catch (error:any) {
        console.log("Error connecting to database",error)
        
    }
}