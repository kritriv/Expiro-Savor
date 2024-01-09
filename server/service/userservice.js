const User = require("../models//usersList");
const { ObjectId } = require("mongodb");

const ViewUser = (queryObject) => {
  let result = User.find(queryObject);
  return result;
};
const AddUser = async (data) => {
  const result = await User(data).save();
  return result;
};

const SingleUser = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await User.findOne(filter);
  return result;
};

const DeleteUser = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await User.deleteOne(filter);
  return result;
};

const UpdateUser = async (id, updateUserData) => {
  const filter = { _id: id };
  const result = await User.findByIdAndUpdate(filter, updateUserData, {
    new: true,
  });
  return result;
};

module.exports = {
  ViewUser,
  AddUser,
  SingleUser,
  DeleteUser,
  UpdateUser,
};
