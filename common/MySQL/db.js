const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'P@ssw0rd',
//     database: 'Demo'
// });

const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12614917',
  password: 've2Tr372BF',
  database: 'sql12614917'
});


connection.connect((err)=>{
  if (err) {
    console.log(err);
  }else{
    console.log("Database connected!");
  }
})
module.exports = connection; 