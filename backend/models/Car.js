const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
{
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number
    },
    fuelType: {
        type: String
    },
    transmission: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Car", carSchema);