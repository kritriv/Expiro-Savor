const { ViewNGOs, AddNGO, SingleNGO, DeleteNGO, UpdateNGO } = require('../service/ngoservice');

// To get All NGOs List
const getAllNgos = async (req, res) => {
    try {
        const { email, name, mobileNo, onGoogleMap, city, state, pincode, country, sort, select, page, limit } = req.query;

        const NGOs = await ViewNGOs({ email, name, mobileNo, onGoogleMap, city, state, pincode, country, sort, select, page: Number(page) || 1, limit: Number(limit) || 5,
        });

        res.status(200).json({
            status: 'success',
            message: 'NGOs fetched successfully',
            NGOs,
            nbHits: NGOs.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching NGOs',
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
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'NGO details fetched successfully',
            data: NGO,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single NGO',
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
            status: 'success',
            message: 'NGO added successfully',
            savedNGO,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating and saving NGO.' });
    }
};

// To Delete a Single NGO Details
const deleteSingleNgo = async (req, res) => {
    try {
        const id = req.params.id;
        const NGO = await DeleteNGO(id);

        if (!NGO) {
            return res.status(404).json({ message: 'NGO not found, deletion unsuccessful' });
        }
        res.status(200).json({
            status: 'success',
            message: 'NGO deleted successfully',
            deletedNGO: NGO,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single NGO',
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
            return res.status(404).json({ message: 'NGO not found, update unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'NGO updated successfully',
            updatedNGO,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single NGO',
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
