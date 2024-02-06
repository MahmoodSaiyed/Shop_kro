import Express ,{Request,Response} from "express";
export const cart_router=Express.Router()
import {cN} from "./connection"

// import {decodedRequest} from "./authentication"
cart_router.use(Express.json())
class cart_product_Info{
    product_name:string="";
    product_image:string="";
    product_description:string="";
    product_price:number=0;
    discount:number=0;
    discount_type:string="";
    product_id:number=0;
    cart_id:number=0;
    quantity:number=0;
    total_amount_after_discount?:number=0;
    total_amount_of_product_with_quantity?:number=0;
}
class cart_Info{
    user_name:string="";
    total_product:number=0;
    product_list:Object[]=[];
    total_price_of_all_product:number=0;

};


// show information of cart.
cart_router.get("/get",(req:Request,res:Response)=>
{   const user_id=res.locals.decode.user_id;
    const qry: string = `
    select * from cart as c
    inner join user as u on c.user_id = u.user_id
    inner join product as p on c.product_id=p.product_id
    where u.user_id=?`;

    cN.query(qry,user_id,(err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        if(result.length==0)
        {
            return res.status(500).send({error:"empty"})
        }
        var list_cartinfo:cart_product_Info[]=[]
        var total_amount:number=0
        
        for (let item of result)
        {
            const cart_product_information:cart_product_Info={
                cart_id:item.cart_id,

                product_id:item.product_id,
                product_name:item.product_name,
                product_image:item.product_image,
                product_description:item.product_description,
                product_price:item.product_price,
                discount:item.discount,
                discount_type:item.discount_type,
                quantity:item.quantity
            }

            if(item.discount_type=="%")
            {
                cart_product_information["total_amount_after_discount"]=item.product_price-(item.product_price*(item.discount/100))
                cart_product_information["total_amount_of_product_with_quantity"]=Math.round((item.product_price-(item.product_price*(item.discount/100)))*item.quantity)
                total_amount+=Math.round((item.product_price-(item.product_price*(item.discount/100)))*item.quantity)
                list_cartinfo.push(cart_product_information)

            }
            else{
                cart_product_information["total_amount_after_discount"]=item.product_price-item.discount
                cart_product_information["total_amount_of_product_with_quantity"]=Math.round((item.product_price-item.discount)*item.quantity)
                total_amount+=Math.round((item.product_price-item.discount)*item.quantity)
                list_cartinfo.push(cart_product_information)

            }
        }
        const cart_information:cart_Info={user_name:result[0].user_name,total_product:result.length,product_list:list_cartinfo,total_price_of_all_product:total_amount}
        return res.status(200).send(cart_information)
        
    })
})

// add cart detail.

cart_router.post("/post",(req:Request,res:Response)=>
{
    const user_id=res.locals.decode.user_id;

    const data = req.body;
    if ((typeof data.product_id=="number" && typeof data.quantity=="number") == false) {
        return res.status(400).send({ error: "syntax error" })
    }

    const qry = `insert into cart(user_id,product_id,quantity) values(?,?,?)`
    cN.query(qry, [ user_id,data.product_id,data.quantity], (err: any, result: any) => {
        if (err) {
            if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                return res.status(400).send({ error: "Duplicate entry" })
            }
            return res.status(500).send({ error: "internal error" })
        }
        return res.status(200).send({ message: "cart data added" })
    })

})


// update cart detail.
 cart_router.put("/put",(req:Request,res:Response)=>
 {  const user_id=res.locals.decode.user_id
    const data=req.body;
    if((typeof data.quantity=="number" && typeof data.product_id=="number")==false)
    {
        return res.status(400).send({error:"syntax error"})
    }
         const qry = "update cart set quantity=? where  user_id=? and product_id=? "
        cN.query(qry,[data.quantity,user_id,data.product_id], (err: any, result: any) => {
            if (err) {
                if (err.sqlMessage.slice(0, 9) == "Duplicate") {
                    return res.status(400).send({ error: "Duplicate entry" })
                }
                return res.status(500).send({ error: "internal error" })
            }
            return res.status(200).send({ message: "data will be updated" })

        })

    
})

// delete cart detail.

cart_router.delete("/delete",(req:Request,res:Response)=>
{   const user_id=res.locals.decode.user_id;

    const data=req.body;
    if((typeof data.product_id=="number" && typeof data.cart_id=="number")==false)
    {
        return res.status(400).send({error:"syntax_error"})
    }
    const qry = "delete from cart where user_id=? and  product_id=? and cart_id=?"
    cN.query(qry, [user_id ,data.product_id,data.cart_id], (err: any, result: any) => {
        if (err) {
            return res.status(500).send({error:err.sqlMessage})
        }
        return res.status(299).send({ message: "data will be deleted" })

    })


        

})
