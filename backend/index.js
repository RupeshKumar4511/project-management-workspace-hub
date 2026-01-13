import dotenv from 'dotenv';
dotenv.config()
import app from './app.js';
import client from './config/db.js';

const PORT = process.env.PORT || 3000;



client.connect((err)=>{
    if(err){
        console.log("Database Connection Error : \n",err.stack)
    }else{
        console.log("Database Connected Successfully.")
        app.listen(PORT,()=>{
        console.log(`server is listening on port ${PORT}`);
    })
    }
})