const {
  ViewUser,
  AddUser,
  SingleUser,
  DeleteUser,
  UpdateUser,
} = require("../service/userservice");

// To get All Users list
const getAllUsers = async (req, res) => {
  try {
    const {
      userid,
      username,
      firstName,
      lastName,
      role,
      email,
      mobileNo,
      Subscribed,
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
    if (userid) {
      queryObject.userid = userid;
    }
    if (username) {
      queryObject.username = { $regex: new RegExp(username, "i") };
    }
    if (role) {
      queryObject.role = { $regex: new RegExp(role, "i") };
    }
    if (mobileNo) {
      queryObject.mobileNo = mobileNo;
    }
    if (Subscribed) {
      queryObject.Subscribed = Subscribed.toLowerCase() === "true";
    }
    if (firstName) {
      queryObject["name.firstName"] = { $regex: new RegExp(firstName, "i") };
    }
    if (lastName) {
      queryObject["name.lastName"] = { $regex: new RegExp(lastName, "i") };
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

    let apiData = ViewUser(queryObject);

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

    const Products = await apiData;
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      Products,
      nbHits: Products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching products",
      error: error.message,
    });
  }
};

// To get Single User Details
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await SingleUser(id);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "User details fetched successfully",
      data: User,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the single User",
      error: error.message,
    });
  }
};

// To Add a User to Users list
const postSingleUser = async (req, res) => {
  const data = req.body;
  try {
    const savedUser = await AddUser(data);
    res.status(201).json({
      status: "success",
      message: "User added successfully",
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating and saving User." });
  }
};

// To Delete a Single User Details
const deleteSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await DeleteUser(id);

    if (!User) {
      return res
        .status(404)
        .json({ message: "User not found, deletion unsuccessful" });
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      deletedUser: User,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the single User",
      error: error.message,
    });
  }
};

// To Update a Single User Details
const updateSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedUser = await UpdateUser(id, updateUserData);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found, update unsuccessful" });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the single User",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  postSingleUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
