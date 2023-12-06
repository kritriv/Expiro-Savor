const usersList = require("../models/usersList");

const getAllUsers = async (req, res) => {

    const {userid, username, firstName, lastName, email,Subscribed, city, state, pincode, country, sort, select } = req.query;
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


module.exports = { getAllUsers };