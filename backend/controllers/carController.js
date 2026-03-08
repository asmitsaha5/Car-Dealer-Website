const Car = require("../models/Car");


// CREATE CAR (User lists a car)
exports.createCar = async (req, res) => {
    try {

        const car = new Car({
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            year: req.body.year,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            description: req.body.description,
            seller: req.user.id,
            status: "pending"
        });

        await car.save();

        res.status(201).json({
            message: "Car submitted for approval",
            car
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET ALL APPROVED CARS (Public marketplace)
exports.getCars = async (req, res) => {
    try {

        const cars = await Car.find({ status: "approved" })
            .populate("seller", "name email");

        res.json(cars);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET SINGLE CAR
exports.getCarById = async (req, res) => {
    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json(car);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// UPDATE CAR
exports.updateCar = async (req, res) => {
    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        if (car.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCar);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE CAR
exports.deleteCar = async (req, res) => {
    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        if (car.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Car.findByIdAndDelete(req.params.id);

        res.json({ message: "Car deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET CARS LISTED BY LOGGED IN USER
exports.getMyCars = async (req, res) => {
    try {

        const cars = await Car.find({ seller: req.user.id });

        res.json(cars);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ADMIN APPROVE CAR
exports.approveCar = async (req, res) => {
    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        car.status = "approved";
        await car.save();

        res.json({
            message: "Car approved successfully",
            car
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};