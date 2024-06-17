import databaseConfig from "../config/database.config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    // operatorsAliases: false,
    pool: databaseConfig.pool,
  }
);

export default sequelize;
