const Car = require("../models/Car");

exports.createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};