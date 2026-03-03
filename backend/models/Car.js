const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        fuelType: { type: String },
        transmission: { type: String },
        description: { type: String },
        image: { type: String },
        viewCount: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);