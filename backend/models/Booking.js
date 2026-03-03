const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        },
        date: { type: Date },
        time: { type: String },
        branch: { type: String },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);