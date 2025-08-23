const mysql2 = require("mysql2");
// require("dotenv").config();

const dbConnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
});

module.exports = dbConnection.promise();

// const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({
//   user: process.env.USER,
//   database: process.env.DATABASE,
//   host: "localhost",
//   password: process.env.PASSWORD,
//   connectionLimit: 10,
// });

// // dbConnection.execute("SELECT 'test'", (err, result) => {
// //   if (err) {
// //     console.log(err.message);
// //   } else {
// //     console.log(result);
// //   }
// // });
// module.exports = dbConnection.promise();
