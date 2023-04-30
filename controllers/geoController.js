const connection = require("../common/MySQL/db");
const MySQLQueries = require("../common/MySQL/mysqlqueries");

module.exports = {
    async getGeoDetails(req,res){
        let country = req.body.country;
        let state = req.body.state;
        let city = req.body.city;
        let query = "";
        if(country === ""){
            query = MySQLQueries.GET_COUNTRIES;
        }
        else{
            if(state === ""){
                query = `SELECT id,name FROM states where country_id = ${country} ORDER BY name asc`;
            }else{
                if(city === ""){
                    query = `SELECT id,name FROM cities where state_id = ${state}  ORDER BY name asc`;
                }
                
            }
        }
    
        connection.query(query,(err,resp)=>{
            if(err){
                res.status(500).send("Error retreiving geo data");
            }else{
                res.status(200).send({
                    status:"Success",
                    data:resp
                });
            }
        })
    
    
    }
}