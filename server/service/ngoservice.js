const NGO = require("../models/ngoList");
const { ObjectId } = require("mongodb");

const ViewNGOs = (queryObject) => {
  let result = NGO.find(queryObject);
  return result;
};
const AddNGO = async (data) => {
  const result = await NGO(data).save();
  return result;
};

const SingleNGO = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await NGO.findOne(filter);
  return result;
};

const DeleteNGO = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await NGO.deleteOne(filter);
  return result;
};

const UpdateNGO = async (id, updateNGOData) => {
  const filter = { _id: id };
  const result = await NGO.findByIdAndUpdate(filter, updateNGOData, {
    new: true,
  });
  return result;
};

module.exports = {
  ViewNGOs,
  AddNGO,
  SingleNGO,
  DeleteNGO,
  UpdateNGO,
};
