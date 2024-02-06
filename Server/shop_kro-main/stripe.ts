import Express, { Request, Response } from "express";
import Stripe from 'stripe';
import { cN } from "./connection"
import { Token } from "typescript";
const stripe = new Stripe('sk_test_51OgSGjSCvPW0BRZvO9AOKJDRVdzAItsu9g9Jzo71nL6nJDc0Agv3DYuUkmoyUydXKhPfMPItGiDUjv8Mv9DzKrCb00puyjl4jo');
export const stripe_router = Express.Router()
stripe_router.use(Express.static('public'));
stripe_router.use(Express.json())

interface product_strip_interface {
    product_name: string;
    quantity: number;
    total_amount_after_discount?:number;
}



stripe_router.post("/post", async (req: Request, res: Response) => {
    const total_price=req.body.total_amount;
    var total_amount_product: number = 0;
    const user_id = res.locals.decode.user_id;

    const qry: string = `select * from cart as c
    inner join product as p on p.product_id=c.product_id
    where user_id=?`

    const list_of_product_info: product_strip_interface[] = [];
    cN.query(qry, user_id, async (err: any, result: any) => {
        if (err) {
            return res.status(500).send({ error: err.sqlMessage })
        }


        for (let item of result) {
            const product_info: product_strip_interface = {
                product_name: item.product_name,
                quantity: item.quantity

            }


            if (item.discount_type == "%") {
                product_info["total_amount_after_discount"] = (item.product_price - (item.product_price * (item.discount / 100)))*100

                list_of_product_info.push(product_info)
                continue
            }
            else {
                product_info["total_amount_after_discount"] = (item.product_price - item.discount)*100
                list_of_product_info.push(product_info)
                continue
            }
        }
        const data = list_of_product_info;

        const lineItems=data.map((values)=>(
        {
            price_data:{
                currency:"inr",
                    product_data:{  

                        name:values.product_name
                    },
                    unit_amount:values.total_amount_after_discount
            },

            quantity:values.quantity
        }))


        const session = await stripe.checkout.sessions.create({
            line_items:lineItems,
            payment_method_types: ['card',],
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            customer_email: 'customer@example.com', // Add customer's email
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['IN'], // Specify the allowed countries for shipping address
            },
        });
        
        return res.json({id:session.id})

    })
    
    
});

