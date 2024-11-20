import UserSchema from "./UserSchema.js";

// C

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
// R
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email: email });
};
// U
// D
