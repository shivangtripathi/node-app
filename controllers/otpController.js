const jwt = require('jsonwebtoken');
const connection = require("../common/MySQL/db");
const MySQLQueries = require("../common/MySQL/mysqlqueries");
const generateOTP = require('../utils/otp');
const getExpireTime = require('../utils/expireTime');
const getUserDetails = require("../utils/userDetails");


module.exports = {
    async getOtp(req,res){
        let email = req.body.email;

        if(email===""){
            res.status(400).send({
                "message":"Invalid request"
            })
        }

        let otp = generateOTP();
        let expTime = getExpireTime();
    
        connection.query(MySQLQueries.REPLACE_SESSION_OTP_QUERY,[email,otp,expTime],(err,succ)=>{
            if(err){
                console.log("err",err);
                res.status(500).send("Error generating OTP");
            }else{
                res.status(200).send({
                    "otp":otp,
                    "status":"Success"
                })
            }
        })
    },

    async verifyOtp(req,res){
        let email = req.body.email;
        let otp = req.body.otp;
    
        if(!(email && otp)){
            res.status(400).send({
                "message":"Invalid request"
            })
        }
        
        connection.query(MySQLQueries.GET_OTP_EXPIRE_TIME,[email], async (err,result)=>{
            if(err){
                res.status(500).send("Error validating OTP");
            }else{
                let currTimeStamp = new Date().valueOf();
                if(otp == result[0].otp && currTimeStamp<result[0].expire_time && result[0].is_used == 0){
                    connection.query(MySQLQueries.CREATE_USER_ENTRY,[email], async (error,resp)=>{
                        if(error?.code === "ER_DUP_ENTRY"){
                            let user_object = null;
                            connection.query(MySQLQueries.GET_USER_RECORDS,[email], async (_err,_resp)=>{
                                if(_err){
                                    res.sendStatus(500);
                                }else{
                                    user_object = await getUserDetails(_resp[0]);
                                    const accessToken = jwt.sign(email,process.env.ACCESS_TOKEN_SECRET);
                                    res.cookie('auth',accessToken,{expires:new Date(Date.now()+60000),httpOnly:true});
                                    res.status(200).send({
                                        "status":"Success",
                                        "user":user_object
                                    })
                                }
                            })
                        }
                        else{
                            const accessToken = jwt.sign({email,otp},process.env.ACCESS_TOKEN_SECRET);
                            res.cookie('auth',accessToken,{expires:new Date(Date.now()+60000),httpOnly:true});
                            res.status(200).send({
                                "status":"Success"
                            })
                        }
                    })
                }else{
                    res.status(401).send("Validation Failed");
                }
            }
        });
    },

    
}