import Express ,{Request,Response} from "express";
export const category_router=Express.Router()
import {cN} from "./connection"
category_router.use(Express.json())
class categoryInfo{
    category_id:number=0;
    category_name:string="";
    category_image:string="";
    category_description:string="";
}

category_router.get("/get",(req:Request,res:Response)=>
{
    const qry: string = `select * from category`;
    cN.query(qry, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }

        var list_categoryinfo:categoryInfo[]=[]
        for (let item of result)
        {
            const categoryinformation:categoryInfo={
                category_id:item.category_id,
                category_name:item.category_name,
                category_image:item.category_image,
                category_description:item.category_description
            }

            list_categoryinfo.push(categoryinformation)
        }
        res.status(200).send(list_categoryinfo)
        
    })

})
// category detail by id

category_router.get("/get/:category_id",(req:Request,res:Response)=>
{
    const qry: string = `select * from category where category_id=?`;
    cN.query(qry,req.params.category_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }

        if(result.length==0)
        {return res.status(400).send({error:"please enter valid category_id"})}

        const categoryinformation:categoryInfo={
            category_id:result[0].category_id,
            category_name:result[0].category_name,
            category_image:result[0].category_image,
            category_description:result[0].category_description
        }
        
        res.status(200).send(categoryinformation)
        
        
    })

})

category_router.post("/post",(req:Request,res:Response)=>
{
    const data = req.body;
    if ((typeof data.category_name == "string" && typeof data.category_image == "string" && typeof data.category_description == "string") == false) {
        return res.status(400).send({ error: "syntax error" })
    }
    const qry = `insert into category(category_name,category_image,category_description) values(?,?,?)`
    cN.query(qry, [data.category_name, data.category_image, data.category_description], (err: any, result: any) => {
        if (err) {
            if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                return res.status(400).send({ error: "Duplicate entry" })
            }
            return res.status(500).send({ error: "internal error" })
        }
        return res.status(200).send({ message: "user data added" })
    })

})

category_router.put("/put/:category_id",(req:Request,res:Response)=>
{
    const data=req.body;
    if ((typeof data.category_name == "string" && typeof data.category_image == "string" && typeof data.category_description == "string") == false) {
        return res.status(400).send({ error: "syntax error" })
    }
    const qry = "select * from category where category_id=?"
    cN.query(qry, req.params.category_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }

        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "update category set category_name=?,category_image=?,category_description=? where category_id=?"
        cN.query(qry,[data.category_name, data.category_image, data.category_description,req.params.category_id], (err: any, result: any) => {
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

category_router.delete("/delete/:category_id",(req:Request,res:Response)=>
{
    const qry = "select * from category where category_id=?"
    cN.query(qry, req.params.category_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "delete from category where category_id=?"
        cN.query(qry, req.params.category_id, (err: any, result: any) => {
            if (err) {
                return res.status(500).send({error:err.sqlMessage})
            }
            return res.send({ message: "data will be deleted" })

        })
    })
})
