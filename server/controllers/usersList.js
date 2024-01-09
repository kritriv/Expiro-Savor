const { ViewUser, AddUser, SingleUser, DeleteUser, UpdateUser } = require('../service/userservice');

// To get All Users list
const getAllUsers = async (req, res) => {
    try {
        const { userid, username, firstName, lastName, role, email, mobileNo, Subscribed, city, state, pincode, country, sort, select, page, limit } = req.query;

        const Users = await ViewUser({ userid, username, firstName, lastName, role, email, mobileNo, Subscribed, city, state, pincode, country, sort, select, page: Number(page) || 1, limit: Number(limit) || 5,
        });

        res.status(200).json({
            Status: 'success',
            Message: 'Users fetched successfully',
            Users,
            nbHits: Users.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching Users',
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
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'User details fetched successfully',
            data: User,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single User',
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
            status: 'success',
            message: 'User added successfully',
            savedUser,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating and saving User.' });
    }
};

// To Delete a Single User Details
const deleteSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const User = await DeleteUser(id);

        if (!User) {
            return res.status(404).json({ message: 'User not found, deletion unsuccessful' });
        }
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            deletedUser: User,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single User',
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
            return res.status(404).json({ message: 'User not found, update unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single User',
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
