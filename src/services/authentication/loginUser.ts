import User from "../../models/user.js";
import bcrypt from "bcrypt";

const loginUser = (username: string, password: string) => {
  return new Promise<User>(async (resolve, reject) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return reject(401);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return reject(401);
      }

      return resolve(user);
    } catch (error) {
      console.log(error);
      return reject(500);
    }
  });
};

export default loginUser;
