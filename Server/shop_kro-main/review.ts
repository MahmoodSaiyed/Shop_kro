import Express ,{Request,Response} from "express";
export const review_router=Express.Router()
import {cN} from "./connection"

// interface.
interface product_review_interface{
    product_name:string;
    product_description:string;
    quantity:number;
    total_amount?:number;
}



interface address_review_interface{
    full_name:string;
    street_number:string;
    city:string;
    state:string;
    pincode:string;
    country:string;
    mobile_number:string;

}





review_router.use(Express.json())

review_router.get("/get",(req:Request,res:Response)=>
{   var total_amount_product:number=0;
    const user_id=res.locals.decode.user_id;
    const qry:string=`select * from review as v 
    inner join cart as c on c.user_id=v.user_id
    inner join product as p on p.product_id=c.product_id
    inner join address as adr on adr.address_id=v.address_id
    where v.user_id=?`
    const list_of_product_info:product_review_interface[]=[];
    
    cN.query(qry,user_id,(err:any,result:any)=>
    {
        if(err)
        {
            return res.status(500).send({error:err.sqlMessage})
        }
        
        if(result.length==0)
        {
            return res.status(400).send({message:"data is enpty"})
        }
        for (let item of result)
        {
            const product_info:product_review_interface={
                product_name:item.product_name,
                product_description:item.product_description,
                quantity:item.quantity,
            }

            
            if(item.discount_type=="%")
            {   

                product_info["total_amount"]=item.quantity*(item.product_price-(item.product_price*(item.discount/100)))

                total_amount_product+=item.quantity*(item.product_price-(item.product_price*(item.discount/100)))
                list_of_product_info.push(product_info)
                continue
  
            }
            else{
                
                product_info["total_amount"]=item.quantity*(item.product_price-item.discount)
                total_amount_product+=(item.quantity*(item.product_price-item.discount))
                list_of_product_info.push(product_info)
                continue

            }
            
        }

        const address_information:address_review_interface={
            full_name:result[0].full_name,
            street_number:result[0].street_number,
            city:result[0].city,
            state:result[0].state,
            pincode:result[0].pincode,
            country:result[0].country,
            mobile_number:result[0].mobile_number

        }
        

        return res.status(200).send({Totoal_product:result.length,Product_information:list_of_product_info,Address_information:address_information,total_amount_products:total_amount_product})


    })

});





//add data in review router.
review_router.post("/post",(req:Request,res:Response)=>
{   const data=req.body;
    const user_id=res.locals.decode.user_id;
    const qry=`insert into review(user_id,address_id)
    values(?,?)`
    cN.query(qry,[user_id,data.address_id],(err:any,result:any)=>
    {
        if(err)
        {
            return res.status(500).send({error:err.sqlMessage})
        }
        return res.status(200).send({message:"data added"})
    })
})



// delete address
review_router.delete("/delete",(req:Request,res:Response)=>
{   const user_id=res.locals.decode.user_id;
    const qry=`delete from review where user_id=? and address_id=?`
    cN.query(qry,[user_id,req.body.address_id],(err:any,result:any)=>
    {
        if(err){return res.status(500).send({error:err.sqlMessage})}
        return res.status(200).send({message:"done"})
    })
})