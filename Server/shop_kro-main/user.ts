import Express, { Request, Response } from "express";
export const user_router = Express.Router()
import {cN} from "./connection"
import { middleware } from "./authentication";
user_router.use(Express.json())
class userInfo {
    user_id:number=0
    user_name: string = "";
    email: string = "";
    mobile_number: string = "";
    password:string="";  
};
interface error{
    code:string;
    errno:number;
    sqlState:string;
    sqlMessage:string;
    sql:string;
};
user_router.get("/get", middleware,(req: Request, res: Response) => {

    const user_id=res.locals.decode.user_id;

    const qry: string = `select * from user where user_id=?`;
    cN.query(qry, user_id,(err: any, result: any) => {
        if (err) {
           return  res.status(500).send({error:err.sqlMessage})
        }

        var list_userinfo:userInfo[]=[]
        for (let item of result)
        {
            const userinformation:userInfo={
                user_id:item.user_id,
                user_name:item.user_name,
                email:item.email,
                mobile_number:item.mobile_number,
                password:item.password
            }

            list_userinfo.push(userinformation)   
        }
        return res.status(200).send(list_userinfo[0])
    })

})

user_router.post("/post", (req: Request, res: Response) => {
    const data = req.body;
    if ((typeof data.user_name == "string" && typeof data.email == "string" && typeof data.mobile_number == "string" && typeof data.password=="string") == false) {
        return res.status(400).send({ error: "syntax error" })
    }
    const emailValidation:RegExp=/([A-z a-z 0-9]+[@][a-z]+[.][a-z])/;
    if(emailValidation.test(data.email)==false )
    {
        return res.status(400).send({error:"please inter valid email id"})
    }
    const qry = `insert into user(user_name,email,mobile_number,password) values(?,?,?,?)`
    cN.query(qry, [data.user_name, data.email, data.mobile_number,data.password], (err: any, result: any) => {
        if (err) {
            if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                return res.status(400).send({ error: "Duplicate entry" })
            }
            return res.status(500).send({ error: "internal error" })
        }
        return res.status(200).send({ message: "user data added" })
    })

})

user_router.put("/put/:user_id", (req: Request, res: Response) => {
    const data=req.body;
    if ((typeof data.user_name == "string" && typeof data.email == "string" && typeof data.mobile_number == "string" && typeof data.password=="string") == false) {
        return res.status(400).send({ error: "syntax error" })
    }
    const qry = "select * from user where user_id=?"
    cN.query(qry, req.params.user_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "update user set user_name=?,email=?,mobile_number=?,password=? where user_id=?"
        cN.query(qry,[data.user_name,data.email,data.mobile_number,data.password,req.params.user_id], (err: any, result: any) => {
            if (err) {
                if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                    return res.status(400).send({ error: "Duplicate entry" })
                }
                return res.status(500).send({ error: "internal error" })
            }
            return res.status(200).send({ message: "data will be updated" })

        })


        
    })

})

user_router.delete("/delete/:user_id", (req: Request, res: Response) => {
    const qry = "select * from user where user_id=?"
    cN.query(qry, req.params.user_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "delete from user where user_id=?"
        cN.query(qry, req.params.user_id, (err: any, result: any) => {
            if (err) {
                return res.status(500).send({error:err.sqlMessage})
            }
            return res.status(200).send({ message: "data will be deleted" })

        })


        
    })

})
