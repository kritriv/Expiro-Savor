const ngoList = require("../models/ngoList");
const { ObjectId } = require("mongodb");

const {
  ViewNGOs,
  AddNGO,
  SingleNGO,
  DeleteNGO,
  UpdateNGO,
} = require("../service/ngoservice");

// To get All NGOs Details
const getAllNgos = async (req, res) => {
  try {
    const {
      email,
      name,
      mobileNo,
      onGoogleMap,
      city,
      state,
      pincode,
      country,
      sort,
      select,
    } = req.query;
    const queryObject = {};

    // ======= Filters Queries =======

    if (email) {
      queryObject.email = { $regex: new RegExp(email, "i") };
    }
    if (name) {
      queryObject.name = { $regex: new RegExp(name, "i") };
    }
    if (mobileNo) {
      queryObject.mobileNo = mobileNo;
    }
    if (onGoogleMap !== undefined) {
      queryObject.onGoogleMap = onGoogleMap.toLowerCase() === "true";
    }
    if (city) {
      queryObject["address.City"] = { $regex: new RegExp(city, "i") };
    }
    if (state) {
      queryObject["address.State"] = { $regex: new RegExp(state, "i") };
    }
    if (pincode) {
      queryObject["address.pincode"] = pincode;
    }
    if (country) {
      queryObject["address.country"] = { $regex: new RegExp(country, "i") };
    }

    // ======== Short , Select ======

    let apiData = ViewNGOs(queryObject);

    if (sort) {
      let sortFix = sort.replace(",", " ");
      apiData = apiData.sort(sortFix);
    }
    if (select) {
      let selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
    }

    // ===== Pagination and limits ====

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const NGOs = await apiData;
    res.status(200).json({
      status: "success",
      message: "NGOs fetched successfully",
      NGOs,
      nbHits: NGOs.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching NGOs",
      error: error.message,
    });
  }
};

// To get Single NGO Details
const getSingleNgo = async (req, res) => {
  try {
    const id = req.params.id;
    const NGO = await SingleNGO(id);

    if (!NGO) {
      return res.status(404).json({ message: "NGO not found" });
    }
    res.status(200).json({
      status: "success",
      message: "NGO details fetched successfully",
      data: NGO,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the single NGO",
      error: error.message,
    });
  }
};

// To Add a NGO to NGOs list
const postSingleNgo = async (req, res) => {
  const data = req.body;
  try {
    const savedNGO = await AddNGO(data);
    res.status(201).json({
      status: "success",
      message: "NGO added successfully",
      savedNGO,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating and saving NGO." });
  }
};

// To Delete a Single NGO Details
const deleteSingleNgo = async (req, res) => {
  try {
    const id = req.params.id;
    const NGO = await DeleteNGO(id);

    if (!NGO) {
      return res
        .status(404)
        .json({ message: "NGO not found, deletion unsuccessful" });
    }
    res.status(200).json({
      status: "success",
      message: "NGO deleted successfully",
      deletedNGO: NGO,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the single NGO",
      error: error.message,
    });
  }
};

// To Update a Single NGO Details
const updateSingleNgo = async (req, res) => {
  try {
    const id = req.params.id;
    const updateNGOData = req.body;

    const updatedNGO = await UpdateNGO(id, updateNGOData);

    if (!updatedNGO) {
      return res
        .status(404)
        .json({ message: "NGO not found, update unsuccessful" });
    }

    res.status(200).json({
      status: "success",
      message: "NGO updated successfully",
      updatedNGO,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the single NGO",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNgos,
  postSingleNgo,
  getSingleNgo,
  deleteSingleNgo,
  updateSingleNgo,
};
