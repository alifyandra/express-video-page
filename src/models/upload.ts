import { DataTypes, Sequelize, Model } from "sequelize";

export default class Upload extends Model {
  declare id: number;
  declare title: string;
  declare url: string;
  declare owner: string;
  declare ownerId: number;
  declare size: number;
}

// Belongs to User
export const uploadInit = (sequelize: Sequelize) => {
  Upload.init(
    {
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
      size: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize }
  );

  return Upload;
};
