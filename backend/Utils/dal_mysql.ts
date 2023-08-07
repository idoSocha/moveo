import mysql from "mysql2";
import config from "./config";

//creating a connection object
const connection = mysql.createPool(
  process.env.DATABASE_URL
  // host: process.env.DB_HOST || config.DB_HOST,
  // user: process.env.DB_USERNAME || config.DB_USERNAME,
  // password: process.env.DB_PASSWORD || config.DB_PASSWORD,
  // database: process.env.DATABASE || config.DATABASE,
);

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    //connection and execute the sql command
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

export default {
  execute,
};
