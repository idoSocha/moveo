import mysql from "mysql";
import config from "./config";

//creating a connection object
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
