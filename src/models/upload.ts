import { DataTypes, ModelAttributes } from "sequelize";

// Belongs to User
const Upload: ModelAttributes = {
  title: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  owner: {
    // Owner's Username
    type: DataTypes.STRING,
  },
};

export default Upload;
