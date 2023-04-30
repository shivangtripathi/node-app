const path = require("path");
const connection = require("../common/MySQL/db");
const MySQLQueries = require("../common/MySQL/mysqlqueries");

module.exports = {
    async profileUpdate(req,res,next){
            let user = req.user;
            let { firstName, lastName, city, country, state, image_url } = req.body;
            connection.query(MySQLQueries.UPDATE_USER_DETAILS,[firstName,lastName,country,state,city,image_url,user],(err,resp)=>{
                if(err){
                    res.status(500).send("Error updating user details");
                }else{
                    res.status(200).send({
                        "status":"Success",
                        "message":"Profile Updated"
                    });
                }
            })
    },
    async profilePage(req,res){
            return res.redirect("profile.html");
    },
}