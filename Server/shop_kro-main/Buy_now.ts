import Express, { Request, Response } from "express";
export const buy_router = Express.Router()
// const cN = require("./connection.ts")
import {cN} from "./connection"
buy_router.use(Express.json())
interface address_information{
full_name:string;
mobile_number:string;
street_number:string;
pincode:string;
city:string;
state:string;
country:string;

};
interface product_information{
    product_name:string;
    product_image:string;
    product_description:string;
    product_price:number;
    discount:number;
    discount_type:string;
    amount_after_discount?:number;
    quantity:number;
    total_product_amount?:number;
}
buy_router.get("/get",(req:Request,res:Response)=>
{  
    const user_id=res.locals.decode.user_id;

    var total_amount_product:number=0;
    const list_review_information:[]=[]
    
    const list_product_information:product_information[]=[]
    const list_address_information:address_information[]=[]
    const qry=`select * from cart as c
    inner join product as p on p.product_id=c.product_id
    where user_id=?;`
    cN.query(qry,user_id,(err:any,result:any)=>
    {
        if(err)
        {
            return res.status(500).send({error:err.sqlMessage})
        }
        for (let val of result)
        {
            const prod_information:product_information={
                product_name:val.product_name,
                product_image:val.product_image,
                product_description:val.product_description,
                product_price:val.product_price,
                discount:val.discount,
                discount_type:val.discount_type,
                quantity:val.quantity
            }
            if(val.discount_type=="%")
            {
                prod_information["amount_after_discount"]=val.product_price-(val.product_price*(val.discount/100))
                prod_information["total_product_amount"]=val.quantity*(val.product_price-(val.product_price*(val.discount/100)))
                total_amount_product+=(val.quantity*(val.product_price-(val.product_price*(val.discount/100))))
                list_product_information.push(prod_information)
            }
            else{
                prod_information["amount_after_discount"]=val.product_price-val.discount
                prod_information["total_product_amount"]=val.quantity*(val.product_price-val.discount)
                total_amount_product+=(val.quantity*(val.quantity*(val.product_price-val.discount)))
                list_product_information.push(prod_information)
            }

        }
        const qry:string=`select * from address 
        where address_id=1`
        cN.query(qry,user_id,(err:any,result:any)=>
        {
            if(err)
            {
                return res.status(500).send({error:err.sqlMessage})
            }

            const adds_info:address_information={
                full_name:result[0].full_name,
                mobile_number:result[0].mobile_number,
                street_number:result[0].street_number,
                pincode:result[0].pincode,
                city:result[0].city,
                state:result[0].state,
                country:result[0].country

            }
            return res.status(200).send({Products:list_product_information,Delivery_address:adds_info,total_amount:total_amount_product})  
        })  
    })
})

