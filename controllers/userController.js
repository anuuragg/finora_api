const User = require('../models/userModel')
const dbConnect = require('../lib/dbConnect')

const getProfile = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if(!user) return res.status(404).json({error: "User not found!"});
        res.json(user);
    } catch {
        res.status(500).json({error: "User not found!"});
    }
};


const updateProfile = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        console.log(userId)
        console.log(req.user)
        const {name, email} = req.body;
        console.log(name, email)
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;

        if(Object.keys(updates).length === 0){
            return res.status(404).json({error: "No fields provided for update!"});
        }

        console.log(updates)

        const updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            {$set: updates},
            {new: true, runValidators: true}
        ).select('-password');

        res.status(201).json({updatedUser});

    } catch {
        res.status(500).json({error: "User not found!"});
    }
}


const deleteProfile = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        console.log(userId)
        const deletedProfile = await User.findOneAndDelete({_id: userId});
        if(!deletedProfile) return res.status(404).json({ message: 'User not found :('});
        res.status(200).json({'message': 'User deleted successfully', deletedProfile});
    } catch {
        res.status(500).json({error: "User not found!"});
    }
}

module.exports = {getProfile, updateProfile, deleteProfile};