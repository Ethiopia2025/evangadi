const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // make sure this is the MySQL protocol port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // temporary, safer: use CA certificate later
  },
});

// Export the connection with promises
module.exports = db.promise();

// const mysql2 = require("mysql2");
// // require("dotenv").config();

// const dbConnection = mysql2.createPool({
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT || 3306,
//   ssl: { rejectUnauthorized: true },
//   connectionLimit: 10,
// });

// module.exports = dbConnection.promise();

// // const mysql2 = require("mysql2");

// // const dbConnection = mysql2.createPool({
// //   user: process.env.USER,
// //   database: process.env.DATABASE,
// //   host: "localhost",
// //   password: process.env.PASSWORD,
// //   connectionLimit: 10,
// // });

// // // dbConnection.execute("SELECT 'test'", (err, result) => {
// // //   if (err) {
// // //     console.log(err.message);
// // //   } else {
// // //     console.log(result);
// // //   }
// // // });
// // module.exports = dbConnection.promise();
