const User = require('../models/userModel')
const dbConnect = require('../lib/dbConnect')
const CustomError = require('../lib/customError')

const getProfile = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user)
    } catch {
        res.status(err.status || 500).json({ error: err.message });
    }
};


const updateProfile = async (req, res) => {
    try{
        await dbConnect();
        const {name, email} = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;

        if(Object.keys(updates).length === 0){
            return res.status(400).json({error: "No fields provided for update!"});
        }

        const updatedUser = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: updates},
            {new: true, runValidators: true}
        ).select('-password');

        res.status(201).json({updatedUser});

    } catch {
        res.status(err.status || 500).json({ error: err.message });
    }
}


const deleteProfile = async (req, res) => {
    try{
        await dbConnect();
        const deletedProfile = await User.findOneAndDelete({_id: req.params.id});
        res.status(200).json({'message': 'User deleted successfully', deletedProfile});
    } catch {
        res.status(err.status || 500).json({ error: err.message });
    }
}

module.exports = {getProfile, updateProfile, deleteProfile};