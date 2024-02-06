import Express,{Request,Response} from "express"
export const success_router=Express()
success_router.get("",(req:Request,res:Response)=>
{
    res.send("success")
    
})