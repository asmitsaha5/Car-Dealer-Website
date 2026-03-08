const express = require("express");
const router = express.Router();

const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// middleware
const protect = authMiddleware.protect;


// CREATE CAR
router.post("/", protect, upload.single("image"), carController.createCar);

// GET ALL APPROVED CARS
router.get("/", carController.getCars);

// GET CARS LISTED BY LOGGED USER
router.get("/mycars", protect, carController.getMyCars);

// ADMIN APPROVE CAR
router.put("/approve/:id", protect, carController.approveCar);

// GET SINGLE CAR
router.get("/:id", carController.getCarById);

// UPDATE CAR
router.put("/:id", protect, carController.updateCar);

// DELETE CAR
router.delete("/:id", protect, carController.deleteCar);

module.exports = router;