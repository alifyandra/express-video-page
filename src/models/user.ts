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
    },
    { sequelize }
  );
  return User;
};
