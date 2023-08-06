import mysql from "mysql";
import config from "./config";

//creating a connection object
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

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
