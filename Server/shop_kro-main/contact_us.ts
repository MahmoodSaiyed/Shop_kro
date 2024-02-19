import Express, { Request, Response } from "express";
export const contact_us_router= Express.Router()
import {cN} from "./connection"
import { middleware } from "./authentication";
contact_us_router.use(Express.json())

contact_us_router.post("/post", middleware,(req: Request, res: Response) => {
    const data=req.body;
    console.log(data)
    // if((typeof data.name=="string" && typeof data.email=="string" && typeof data.phone =="string" && typeof data.subject =="string" && typeof data.message=="string")==false)
    // {
    //     res.status(400).send({Message:"Syntac Error"})
    // }
    const qry=`insert 
                into 
                    contact_us(name,email,phone,subject,message)
                        values(?,?,?,?,?)`

    cN.query(qry,[data.name,data.email,data.phone,data.subject,data.message],(err:any,result:any)=>
    {
        if(err)
        {
            return res.status(500).send({error:err.sqlMessage})
        }
        return res.status(200).send({Messsage:"data will be added"})
    })
})
