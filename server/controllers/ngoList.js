const ngoList = require("../models/ngoList");

const getNGOList= async (req, res) => {

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


module.exports = { getNGOList };