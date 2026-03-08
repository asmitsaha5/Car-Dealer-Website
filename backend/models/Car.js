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

  price: {
    type: Number,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  description: {
    type: String
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["pending", "approved", "sold"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);