import bcrypt from "bcrypt";
// import { Model, ModelStatic } from "sequelize";
import User from "../../models/user.js";

const createUser = (username: string, password: string) => {
  return new Promise<User>(async (resolve, reject) => {
    try {
      if (await User.findOne({ where: { username: username } })) {
        reject("User exists");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username: username,
        password: hashedPassword,
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export default createUser;
