import  {validationResult}  from 'express-validator';

export const schemaValidation = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({message:"bad request",error:errors.array()})
    }

    next()
}