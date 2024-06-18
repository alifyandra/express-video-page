import databaseConfig from "../config/database.config.js";
import { Sequelize } from "sequelize";
import User from "./user.js";
import Upload from "./upload.js";

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

const Users = sequelize.define("User", User);
const Uploads = sequelize.define("Upload", Upload);
Uploads.belongsTo(Users, { foreignKey: "ownerId" });

export default sequelize;
