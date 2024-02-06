import Express, { Request, Response } from "express";
import { cN } from "./connection"
export const address_router = Express.Router();
address_router.use(Express.json())
interface addresstype {
    address_id: number;
    user_id: number;
    country: string;
    full_name: string;
    street_number: string;
    city: string;
    state: string;
    pincode: string;
    mobile_number: string;

}
// show address information of perticular user
address_router.get("/get", (req: Request, res: Response) => {
    const user_id = res.locals.decode.user_id;
       
    const qry = `select * from address where user_id=?`
    cN.query(qry, user_id, (err: any, result: any) => {
        if (err) {
            return res.status(500).send({ error: err.sqlMessage })
        }
        if (result.length == 0) {
            return res.status(400).send({ error: "address note present please add address" })
        }

        const lst_of_address_info: addresstype[] = [];
        for (let val of result) {
            const address_info: addresstype = {
                address_id: val.address_id,
                user_id: user_id,
                country: val.country,
                full_name: val.full_name,
                street_number: val.street_number,
                city: val.city,
                state: val.state,
                pincode: val.pincode,
                mobile_number: val.mobile_number

            }
            lst_of_address_info.push(address_info)
        }
        return res.send(lst_of_address_info)
    })
})


// add address detail of perticular user.
address_router.post("/post", (req: Request, res: Response) => {
    const data = req.body;
    const user_id = res.locals.decode.user_id;
    if ((typeof data.country == "string" && typeof data.full_name == "string" && typeof data.street_number == "string" && typeof data.city == "string" && typeof data.state == "string" && typeof data.pincode == "string" && typeof data.mobile_number == "string") == false) {
        return res.status(400).send({ error: "Syntax error" })
    }
    const qry: string = `
    insert into address(user_id,country,full_name,street_number,city,state,pincode,mobile_number)
    values(?,?,?,?,?,?,?,?)
    `
    cN.query(qry, [user_id, data.country, data.full_name, data.street_number, data.city, data.state, data.pincode, data.mobile_number], (err: any, result: any) => {
        if (err) {
            return res.status(500).send({ error: err.sqlMessage })
        }
        return res.status(200).send({ message: "address data added" })
    })


})


//change address of users
address_router.put("/put/:address_id", (req: Request, res: Response) => {
    const data = req.body;
    const user_id = res.locals.decode.user_id;
    const address_id = Number(req.params.address_id)

    if ((typeof address_id == "number" && typeof data.country == "string" && typeof data.full_name == "string" && typeof data.street_number == "string" && typeof data.city == "string" && typeof data.state == "string" && typeof data.pincode == "string" && typeof data.mobile_number == "string") == false) {
        return res.status(400).send({ error: "Syntax error" })
    }
    const qry: string = `update address set country=?,full_name=?,street_number=?,city=?,state=?,pincode=?,mobile_number=?
    where user_id=? and address_id=?`
    cN.query(qry, [data.country, data.full_name, data.street_number, data.city, data.state, data.pincode, data.mobile_number, user_id, address_id], (err: any, result: any) => {
        if (err) {
            return res.status(500).send({ error: err.sqlMessage })
        }
        return res.status(200).send({ message: "address data updated" })
    })


})


address_router.delete("/delete", (req: Request, res: Response) => {
    const user_id = res.locals.decode.user_id;
    const data = req.body;
    const qry: string = `delete from address where address_id=? and user_id`
    cN.query(qry, [data.address_id, user_id], (err: any, result: any) => {
        if (err) {
            return res.status(500).send({ error: err.sqlMessage })
        }
        return res.status(200).send({ message: "deleted" })
    })
})