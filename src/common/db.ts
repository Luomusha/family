import { Sequelize } from 'sequelize';
import "mysql2"
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME } from './config';
import { logger } from "./logger";

/** mysql **/
const mysql = new Sequelize({
    dialect: 'mysql',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    define: {
        freezeTableName: false,
    },
    logging: (msg: string) => console.log(msg),
});

logger.info("db authenticate...")
mysql.authenticate()
    .then(() => sequelize.sync({ force: false }))
    .then(() => logger.info('db sync...'))
    .catch(e => logger.error(`db error: ${e.message}`));
const sequelize = mysql
export { sequelize }
