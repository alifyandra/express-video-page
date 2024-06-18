import { Dialect } from "sequelize";

export default {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "POSTGRES_PASSWORD",
  DB: "postgres",
  dialect: <Dialect>"postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
