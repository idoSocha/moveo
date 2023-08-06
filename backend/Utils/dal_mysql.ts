import mysql from "mysql";
import config from "./config";

//creating a connection object
const connection = mysql.createPool({
  host: process.env.DB_HOST || config.mySQLhost,
  user: process.env.DB_USERNAME || config.mySQLuser,
  password: process.env.DB_PASSWORD || config.mySQLpass,
  database: process.env.DATABASE || config.mySQLdatabase,
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
