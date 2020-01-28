import mysql from "mysql2";

let pool = null

if(process.env.NODE_ENV === 'DEVELOPMENT'){
      pool = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.DATABSE_DEV_HOST,
        user     : process.env.DATABASE_DEV_USER,
        password : process.env.DATABASE_DEV_PASSWORD,
        database : process.env.DATABASE_DEV_DATABASE
      });
}

else if (process.env.NODE_ENV === 'TEST'){
    pool = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.DATABSE_TEST_HOST,
        user     : process.env.DATABASE_TEST_USER,
        password : process.env.DATABASE_TEST_PASSWORD,
        database : process.env.DATABASE_TEST_DATABASE
      });
}

else if(process.env.NODE_ENV === 'PRODUCTION'){
    pool = mysql.createPool({
        connectionLimit : 10,
        host     : process.env.DATABSE_PROD_HOST,
        user     : process.env.DATABASE_PROD_USER,
        password : process.env.DATABASE_PROD_PASSWORD,
        database : process.env.DATABASE_PROD_DATABASE
      });
}


export default pool;