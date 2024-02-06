import mysql from "mysql2"
export const cN=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"root",
        database:"shop_kro"
    }
);
cN.connect((err)=>
{

    if(err)
    {
        console.log(err)
    }
    else{
        console.log("-->: connected with database ")
    }
})
//module.exports=cN;

