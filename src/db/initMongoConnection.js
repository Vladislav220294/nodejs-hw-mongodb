import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";


export async function initMongoConnection() {
    const userName = getEnvVar("MONGODB_USER");
    const password = getEnvVar("MONGODB_PASSWORD");
    const url = getEnvVar("MONGODB_URL");
    const db = getEnvVar("MONGODB_DB");
    try {
        const responce = await mongoose.connect(`mongodb+srv://${userName}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Mongo connection successfully established!")
    return responce
    } catch (error) {
        console.log('error with MongoDB loading', error)
    }
    
       
}
