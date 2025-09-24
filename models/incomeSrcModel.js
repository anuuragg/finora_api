const mongoose = require('mongoose');

const incomeSrcSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        income_src: {
            type: String,
            required: true,
            unique: true
        }
    },
    {timestamps: true}
);

const IncomeSrc = mongoose.model('incomeSrcSchema', IncomeSrc);
module.exports = IncomeSrc;