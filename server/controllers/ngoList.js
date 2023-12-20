const ngoList = require("../models/ngoList");
const { ObjectId } = require('mongodb');

// To get All NGOs Details
const getAllNgos= async (req, res) => {

    const {email, city, state, pincode, country, sort, select } = req.query;
    const queryObject = {};
    
    // ======= Filters Queries =======

    if (email) {
        queryObject.email = { $regex: new RegExp(email, 'i') };
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

    let apiData = ngoList.find(queryObject);

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

    const NgoList = await apiData;
    res.status(200).json({ NgoList, nbHits: NgoList.length });
}

// To get Single NGO Details
const getSingleNgo = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await ngoList.findOne(filter);
    res.send(result);
}

// To Add a NGO to NGOs list
const postSingleNgo = async (req, res) =>{
    const data=req.body;
    try {
        const newNgo = new ngoList(data);
        const savedNgo = await newNgo.save();
        res.send(savedNgo);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// To Delete a Single NGO Details
const deleteSingleNgo = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await ngoList.deleteOne(filter);
    res.send(result);
}

// To Update a Single NGO Details
const updateSingleNgo = async (req, res) =>{
    const id=req.params.id;
    const updateNgoData=req.body;
    const filter={_id:new ObjectId(id)};

    const updateDoc={
        $set:{
          ...updateNgoData
        },
      }
      const options={upsert:true};

    const result=await ngoList.updateOne(filter,updateDoc,options);
  res.send(result);
}

module.exports = { getAllNgos,postSingleNgo, getSingleNgo, deleteSingleNgo, updateSingleNgo };