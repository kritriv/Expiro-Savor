const usersList = require("../models/usersList");
const { ObjectId } = require('mongodb');

// To get All Users list
const getAllUsers = async (req, res) => {

    const {userid, username, firstName, lastName,role, email, mobileNo, Subscribed, city, state, pincode, country, sort, select } = req.query;
    const queryObject = {};
    
    // ======= Filters Queries =======

    
    if (email) {
        queryObject.email = { $regex: new RegExp(email, 'i') };
    }
    if (userid) {
        queryObject.userid = userid;
    }
    if (username) {
        queryObject.username = { $regex: new RegExp(username, 'i') };
    }
    if (role) {
        queryObject.role = { $regex: new RegExp(role, 'i') };
    }
    if (mobileNo) {
        queryObject.mobileNo = mobileNo;
    }
    if (Subscribed) {
        queryObject.Subscribed =  (Subscribed.toLowerCase() === 'true');
    }
    if (firstName) {
        queryObject['name.firstName'] = { $regex: new RegExp(firstName, 'i') };
    }
    if (lastName) {
        queryObject['name.lastName'] = { $regex: new RegExp(lastName, 'i') };
    }
    if (city) {
        queryObject['address.City'] = { $regex: new RegExp(city, 'i') };
    }
    if (state) {
        queryObject['address.State'] = { $regex: new RegExp(state, 'i') };
    }
    if (pincode) {
        queryObject['address.pincode'] = pincode;
    }
    if (country) {
        queryObject['address.country'] = { $regex: new RegExp(country, 'i') };
    }

    // ======== Short , Select ======

    let apiData = usersList.find(queryObject);

    if(sort){
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // ===== Pagination and limits ====

    let page = Number(req.query.page) || 1 ;
    let limit = Number(req.query.limit) || 5 ;

    let skip  = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit); 

    const UsersList = await apiData;
    res.status(200).json({ UsersList, nbHits: UsersList.length });
}

// To get Single User Details
const getSingleUser = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await usersList.findOne(filter);
    res.send(result);
}

// To Add a User to Users list
const postSingleUser = async (req, res) =>{
    const data=req.body;
    try {
        const newUser = new usersList(data);
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// To Delete Single User Details
const deleteSingleUser = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await usersList.deleteOne(filter);
    res.send(result);
}

// To Update a Single User Details
const updateSingleUser = async (req, res) =>{
    const id=req.params.id;
    const updateUserData=req.body;
    const filter={_id:new ObjectId(id)};

    const updateDoc={
        $set:{
          ...updateUserData
        },
      }
      const options={upsert:true};

    const result=await usersList.updateOne(filter,updateDoc,options);
  res.send(result);
}

module.exports = { getAllUsers,postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser };