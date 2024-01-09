const NGO = require('../models/ngoList');
const { ObjectId } = require('mongodb');

const ViewNGOs = async ({ email, name, mobileNo, onGoogleMap, city, state, pincode, country, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }
        if (mobileNo) {
            queryObject.mobileNo = mobileNo;
        }
        if (onGoogleMap !== undefined) {
            queryObject.onGoogleMap = onGoogleMap.toLowerCase() === 'true';
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

        let apiData = NGO.find(queryObject);

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const NGOs = await apiData;
        return NGOs;
    } catch (error) {
        throw new Error('An error occurred while fetching NGOs: ' + error.message);
    }
};

const AddNGO = async (data) => {
    try {
        const result = await NGO(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding NGO: ${error.message}`);
    }
};

const SingleNGO = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await NGO.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single NGO: ${error.message}`);
    }
};

const DeleteNGO = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await NGO.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting NGO: ${error.message}`);
    }
};

const UpdateNGO = async (id, updateNGOData) => {
    try {
        const filter = { _id: id };
        const result = await NGO.findByIdAndUpdate(filter, updateNGOData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating NGO: ${error.message}`);
    }
};

module.exports = {
    ViewNGOs,
    AddNGO,
    SingleNGO,
    DeleteNGO,
    UpdateNGO,
};
