const connection = require("../common/MySQL/db");
const MySQLQueries = require("../common/MySQL/mysqlqueries");
const base64_encode = require("./bs64");


async function getUserDetails(user_obj){
    const {firstname, lastname, country, state, city, profile_image} = user_obj;
    

    let image_url = null;
    if(profile_image){
        image_url = base64_encode(profile_image);
    }

    let _newObj = {
        firstname,
        lastname,
        "profileImage":image_url,
    }

    await new Promise((resolve,reject)=>{
        if(country){
            connection.query(MySQLQueries.GET_COUNTRY_NAME,country,(err,res)=>{
                if(err){
                    console.log("error fetching countries",err);
                }else{
                    resolve(res[0].name);
                }
            })
        }else{
            reject();
        }
    }).then((data)=>{
        let _country = data;
        _newObj = {
            ..._newObj,
            country:_country
        }
    }).catch(()=>console.log("No Country Details"));

    await new Promise((resolve,reject)=>{
        if(city){
            connection.query(MySQLQueries.GET_CITY_NAME,city,(err,res)=>{
                if(err){
                    console.log("error fetching city",err);
                }else{
                   resolve(res[0].name);
                }
            })
        }else{
            reject();
        }

    }).then((data)=>{
        let _city = data;
        _newObj = {
            ..._newObj,
            city:_city
        }
    }).catch(()=>console.log("No State Details"));

    await new Promise((resolve,reject)=>{
        if(state){
            connection.query(MySQLQueries.GET_STATE_NAME,state,(err,res)=>{
                if(err){
                    console.log("error fetching state",err);
                }else{
                    resolve(res[0].name)
                }
            })
        }else{
            reject();
        }
    }).then((data)=>{
        let _state = data;
        _newObj = {
            ..._newObj,
            state:_state
        }
    }).catch(()=>console.log("No City Details"));
    return _newObj;
}

module.exports = getUserDetails