import User from "../model/User";
// ANDREA'S DEMO CODE

export const getAllUser = async () => {
  return await User.find();
};

export default { getAllUser };
