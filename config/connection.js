const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'f6gktu30adnq2m78',
    // NOTE: Be sure to add your MySQL password here!
    password: '',
    database: 'gitn5upxu50gz18c'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
  });
  
  module.exports = connection;