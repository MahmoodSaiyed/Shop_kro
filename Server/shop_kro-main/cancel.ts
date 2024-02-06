import Express,{Request,Response} from "express"
export const cancel_router=Express()
cancel_router.get("/",(req:Request,res:Response)=>
{
    res.send("cancel")
})