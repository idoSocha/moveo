import dal_mysql from "../Utils/dal_mysql";

//creating the codes table on mySQL
const createCodesTable = () => {
  const SQLcommand = `CREATE TABLE IF NOT EXISTS codes.code_blocks (
        id INT NOT NULL,
        title VARCHAR(45) NOT NULL,
        code VARCHAR(5000) NOT NULL,
        PRIMARY KEY (id));`;
  const response = dal_mysql.execute(SQLcommand);
};
//getting all the code blocks from the DB
const getAllCodes = async () => {
  const SQLcommand = `SELECT * FROM codes.code_blocks ORDER BY id`;
  return await dal_mysql.execute(SQLcommand);
};
//getting a specific code block from the DB
const getCodeByCodeId = async (id: number) => {
  return await dal_mysql.execute(
    `SELECT * FROM codes.code_blocks WHERE id = ${id}`
  );
};

export default {
  createCodesTable,
  getAllCodes,
  getCodeByCodeId,
};
