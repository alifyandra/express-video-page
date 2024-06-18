import { DataTypes, Model, Sequelize } from "sequelize";

export default class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
}

export const userInit = (sequelize: Sequelize) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // To be deleted (JWT's  don't need to be stored in DB)
      // token: {
      // 	type: DataTypes.STRING,
      // },
    },
    { sequelize }
  );
  return User;
};
