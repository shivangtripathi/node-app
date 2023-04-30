const MySQLQueries = {
    "REPLACE_SESSION_OTP_QUERY":"REPLACE INTO session (username,otp,expire_time,is_used) VALUES (?, ?, ?, 0);",
    "GET_OTP_EXPIRE_TIME":"SELECT otp,expire_time,is_used FROM session where username = ?;",
    
    "CREATE_USER_ENTRY":"INSERT INTO user (email) VALUES (?);",
    "GET_USER_RECORDS":"Select * from user where email = ?;",

    "GET_COUNTRIES":"SELECT id,name FROM countries ORDER BY name asc;",

    "UPDATE_USER_DETAILS":"UPDATE user SET firstname = ?, lastname = ?, country = ?, state = ?, city = ?, profile_image = ? WHERE email = ?;",

    "GET_COUNTRY_NAME":"SELECT name FROM countries where id = ?;",
    "GET_STATE_NAME":"SELECT name FROM states where id = ?;",
    "GET_CITY_NAME":"SELECT name FROM cities where id = ?;"

}

module.exports = MySQLQueries;