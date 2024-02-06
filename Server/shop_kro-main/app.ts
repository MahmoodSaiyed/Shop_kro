// import liberary
//to start server npx ts-node app.ts
import Express,{Application,Request,Response,NextFunction} from "express";
import { category_router } from "./category";
import {user_router} from "./user"
import {product_router} from "./product"
import {cart_router} from "./cart"

import {authRouter,middleware} from "./authentication"
import {address_router} from "./address";
import { buy_router } from "./Buy_now";
import { review_router } from "./review";
import { stripe_router } from "./stripe";
import { success_router } from "./success";
import { cancel_router } from "./cancel";
import {product_recomondation_router} from "./product_recomondation";

// call express application.
const app:Application=Express();
const cors=require("cors") 
app.use(cors())

// making routes.
app.use("/category",category_router)
app.use("/user",user_router)
app.use("/product",product_router)
app.use("/cart",middleware,cart_router)
app.use("/authentication",authRouter)
app.use("/address",middleware,address_router)
app.use("/buy",middleware,buy_router)
app.use("/review",middleware,review_router)
app.use("/stripe",middleware,stripe_router)
app.use("/success",success_router)
app.use("/cancel",cancel_router)
app.use("/product_recomondation",middleware,product_recomondation_router)

//listen on 9000 port.
app.listen(9000,()=>
{                       
    console.log("*-* We are Online *-*")
})


