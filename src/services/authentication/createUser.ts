import bcrypt from "bcrypt";
// import { Model, ModelStatic } from "sequelize";
import User from "../../models/user.js";

const createUser = (username: string, password: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (await User.findOne({ where: { username: username } })) {
        reject("User exists");
        return;
      }

      const user = await User.create({
        username: username,
        password: hashedPassword,
      });
      console.log(user);
      resolve(user.id.toString());
    } catch (error) {
      reject(error);
    }
  });
};

export default createUser;
