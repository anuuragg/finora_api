const mongoose = require('mongoose');

const SubCategorySchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ['needs', 'wants', 'savings', 'investments']
        },

        sub_cat_name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {timestamps: true}
);

const SubCategory = mongoose.model('SubCategorySchema', SubCategory);
module.exports = SubCategory;