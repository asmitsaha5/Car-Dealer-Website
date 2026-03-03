const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        },
        message: { type: String, required: true },
        resolved: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);