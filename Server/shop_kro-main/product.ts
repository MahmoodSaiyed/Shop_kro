import Express ,{Request,Response} from "express";
export const product_router=Express.Router()
import {cN} from "./connection"
product_router.use(Express.json())
class productInfo{
    product_id:number=0;
    product_name:string="";
    product_image:string="";
    product_description:string="";
    product_price:number=0;
    discount:number=0;
    discount_type:string="";
    category_id:number=0;
    category_name:string="";
    total_amount_after_discount?:number=0;
};


// show product all information.
product_router.get("/get",(req:Request,res:Response)=>
{
    const qry: string = `
    select p.*,c.category_name from product as p
    inner join category as c on p.category_id=c.category_id`;
    cN.query(qry, (err: any, result: any) => {
        if (err) {
            res.status(500).send({error:err.sqlMessage})
        }
        
        var list_productinfo:productInfo[]=[]
        
        for (let item of result)
        {
            const productinformation:productInfo={
                product_id:item.product_id,
                product_name:item.product_name,
                product_image:item.product_image,
                product_description:item.product_description,
                product_price:item.product_price,
                discount:item.discount,
                discount_type:item.discount_type,
                category_id:item.category_id,
                category_name:item.category_name,
            }
            if(item.discount_type=="%")
            {
                productinformation["total_amount_after_discount"]=Math.round(item.product_price-(item.product_price*(item.discount/100)))
                list_productinfo.push(productinformation)

            }
            else{
                productinformation["total_amount_after_discount"]=Math.round(item.product_price-item.discount)
                list_productinfo.push(productinformation)

            }


            
        }
        return res.status(200).send(list_productinfo)
        
    })

})

//show product information by product id.
product_router.get("/get/product/:product_id",(req:Request,res:Response)=>
{
    const qry: string = `
    select p.*,c.category_name from product as p
    inner join category as c on p.category_id=c.category_id where p.product_id=?`;
    cN.query(qry, req.params.product_id,(err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }

        const productinformation:productInfo={
            product_id:result[0].product_id,
            product_name:result[0].product_name,
            product_image:result[0].product_image,
            product_description:result[0].product_description,
            product_price:result[0].product_price,
            discount:result[0].discount,
            discount_type:result[0].discount_type,
            category_id:result[0].category_id,
            category_name:result[0].category_name,
        }

        if(productinformation.discount_type=="%")
        {
            productinformation["total_amount_after_discount"]=Math.round(productinformation.product_price-(productinformation.product_price*(productinformation.discount/100)))


        }
        else{
            productinformation["total_amount_after_discount"]=Math.round(productinformation.product_price-productinformation.discount)


        }
    return res.status(200).send(productinformation)
        
    
    })

})

// show product information by category
product_router.get("/get/category/:category_name",(req:Request,res:Response)=>
{
    const qry: string = `
    select p.*,c.category_name from product as p
    inner join category as c on p.category_id=c.category_id where c.category_name=?`;
    cN.query(qry, req.params.category_name,(err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        var list_productinfo:productInfo[]=[]
        
        for (let item of result)
        {
            const productinformation:productInfo={
                product_id:item.product_id,
                product_name:item.product_name,
                product_image:item.product_image,
                product_description:item.product_description,
                product_price:item.product_price,
                discount:item.discount,
                discount_type:item.discount_type,
                category_id:item.category_id,
                category_name:item.category_name,
            }
            if(item.discount_type=="%")
            {
                productinformation["total_amount_after_discount"]=Math.round(item.product_price-(item.product_price*(item.discount/100)))
                list_productinfo.push(productinformation)

            }
            else{
                productinformation["total_amount_after_discount"]=Math.round(item.product_price-item.discount)
                list_productinfo.push(productinformation)

            }


            
        }
        return res.status(200).send(list_productinfo)
    
    })

})

// add product information.
product_router.post("/post",(req:Request,res:Response)=>
{
    const data = req.body;
    if ((typeof data.product_name == "string" && typeof data.product_image== "string" && typeof data.product_description== "string" && typeof data.product_price == "number" && typeof data.discount== "number" && typeof data.discount_type== "string" && typeof data.category_id== "number") == false) {
        return res.status(400).send({ error: "syntax error" })
    }

    const qry = `insert into product(product_name,product_image,product_description,product_price,discount,discount_type,category_id) values(?,?,?,?,?,?,?)`
    cN.query(qry, [ data.product_name,data.product_image,data.product_description,data.product_price,data.discount,data.discount_type,data.category_id], (err: any, result: any) => {
        if (err) {
            if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                return res.status(400).send({ error: "Duplicate entry" })
            }
            return res.status(500).send({ error: "internal error" })
        }
        return res.status(200).send({ message: "user data added" })
    })


})

// update product inforamtion by using product_id.

product_router.put("/put/:product_id",(req:Request,res:Response)=>
{

    const data = req.body;
    if ((typeof data.product_name == "string" && typeof data.product_image== "string" && typeof data.product_description== "string" && typeof data.product_price == "number" && typeof data.discount== "number" && typeof data.discount_type== "string" && typeof data.category_id== "number") == false) {
        return res.status(400).send({ error: "syntax error" })
    }
    const qry = "select * from product where product_id=?"
    cN.query(qry, req.params.product_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "update product set product_name=?,product_image=?,product_description=?,product_price=?,discount=?,discount_type=?,category_id=? where product_id=?"
        cN.query(qry,[data.product_name,data.product_image,data.product_description,data.product_price,data.discount,data.discount_type,data.category_id,req.params.product_id], (err: any, result: any) => {
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


// delete product information by using .

product_router.delete("/delete/:product_id",(req:Request,res:Response)=>
{
    const qry = "select * from product where product_id=?"
    cN.query(qry, req.params.product_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "please enter valid user_id" })
        }
        const qry = "delete from product where product_id=?"
        cN.query(qry, req.params.product_id, (err: any, result: any) => {
            if (err) {
                return res.status(500).send({error:err.sqlMessage})
            }
            return res.status(200).send({ message: "data will be deleted" })

        })


        
    })

})
                                                                                                                                                                    