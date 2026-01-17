import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config()
export const authentication = async(req,res,next)=>{
    const accessToken = req.cookies?.accessToken || req.body.accessToken;
    if(!accessToken){
        return res.status(401).send({success:false,message:"Access Token is required"})
    }

    try {
        const decodedData = jwt.verify(accessToken,process.env.JWT_SECRET);
        req.user = decodedData;

        return next()
        
    } catch (error) {
        return res.status(401).send({success:false,message:"Your access token is expired or invalid"})
    }
}