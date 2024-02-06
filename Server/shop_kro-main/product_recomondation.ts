import Express ,{Request,Response} from "express";
export const product_recomondation_router=Express.Router()
import {cN} from "./connection";
import {PythonShell} from 'python-shell';
product_recomondation_router.use(Express.json())
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


interface optionInterface{
    scriptPath: string;
    args: string[];
}
product_recomondation_router.get("/get/:product_id",(req:Request,res:Response)=>

{
    //  var list_of_recomondation:Array<Array<Number>>=[]
   var list_of_recomondation:Number[]=[]
    // Sample data to be passed from Node.js to Python
    const user_id=res.locals.decode.user_id;
    var input_data:Number[]=[user_id,req.params.product_id];


    let options:optionInterface={
        scriptPath:"C:/Users/ABC/Desktop/GitProject/shop_kro/Server/shop_kro-main",
        args:input_data.map(String)
    };
    PythonShell.run('python.py', options).then(results=>{

        for(let i=0;i<results.length-1;i++)
        {

            list_of_recomondation[i]=Number(results[i].slice(3,))

        }


        const qry="select * from product where product_id =? or product_id=? or product_id=? or product_id=? or product_id=? or product_id=? or product_id=? or product_id=?"
        cN.query(qry,list_of_recomondation,(err:any,result:any)=>
        {
          if(err)
          {
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
        
      });



})



