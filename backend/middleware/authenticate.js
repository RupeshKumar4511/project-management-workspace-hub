import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config()
export const authentication = async(req,res)=>{
    const accessToken = req.cookies?.accessToken || req.body.accessToken;

    try {
        const decodedData = jwt.verify(accessToken,process.env.JWT_SECRET);
        req.user = decodedData;
        
    } catch (error) {
        return res.status(500).send({success:false,message:"internal server error"})
    }
}