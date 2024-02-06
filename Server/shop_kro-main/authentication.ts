// import Express,{Request,Response} from "express";
//const Express=require("express")
import Express,{Request,Response,NextFunction} from "express";
import jwt from 'jsonwebtoken';
const authRoutercN=require("./connection");
import {cN} from "./connection";

export const authRouter=Express.Router();
authRouter.use(Express.json())

export const middleware=async(req:Request,res:Response,next:NextFunction)=>{
    let  token= req.headers.authorization as string;


    
 if( token==undefined)
    {
        return res.status(200).send({error:"token is not present"})
    }
  
    
    if(token.startsWith("Bearer "))
    {
        token=token.slice(7,token.length );
    }
    if(token)
    {


        const decodedToken= jwt.verify(token,"thisismysecret");
        console.log(decodedToken)
        res.locals.decode=decodedToken ;
        return next()

    }
    return res.status(400).send({success:"false",message:"token is note right"})
    
    

}


authRouter.post("/post/signin",(req:Request,res:Response)=>
{
    const body=req.body;
    const qry:string=`select * from user`;
    cN.query(qry,(err:any,result:any)=>
    {
        if(err)
        {
            res.status(500).send({error:err.sqlMessage})
        }

        for (const item of result)
        {
            if(body.email==item.email && body.password==item.password)
            {   var token=jwt.sign({user_id:item.user_id,role:"admin"},"thisismysecret",{expiresIn:"160h"})
                return res.status(200).send({token:"Bearer "+token})
            }
            continue;
        }
        return res.status(400).send({error:"please enter valid emal and password"})

    })
})

authRouter.get("/get",middleware,(req:Request,res:Response)=>
{
    return res.status(200).send({message:"login successfull"})
})
