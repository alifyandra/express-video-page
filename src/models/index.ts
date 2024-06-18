import databaseConfig from "../config/database.config.js";
import { Sequelize } from "sequelize";
import { userInit } from "./user.js";
import { uploadInit } from "./upload.js";

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

const User = userInit(sequelize);
const Upload = uploadInit(sequelize);
Upload.belongsTo(User, { foreignKey: "ownerId" });

export default sequelize;
