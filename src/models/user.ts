import { DataTypes, ModelAttributes } from "sequelize";

const User: ModelAttributes = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // To be deleted (JWT's  don't need to be stored in DB)
  token: {
    type: DataTypes.STRING,
  },
};

export default User;
