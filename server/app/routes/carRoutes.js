const router = require('express').Router();

const {getAllCars,
    getCarById,
    createCar,
    updateCarById,
    deleteCarById} = require('../controllers/carController');

// Sample data
const cars = [
    {
    "id": 1,
    "Make": "Nissan",
    "Model": "Skyline",
    "Year": "1998",
    "Horsepower": "340hp",
    "Completed": true
},
{
    "id": 2,
    "Make": "Toyota",
    "Model": "Supra",
    "Year": "1997",
    "Horsepower": "300hp",
    "Completed": true
},
{
    "id": 3,
    "Make": "Mazda",
    "Model": "RX-7",
    "Year": "2000",
    "Horsepower": "310hp",
    "Completed": true
},
{
    "id": 4,
    "Make": "Audi",
    "Model": "R-8",
    "Year": "2008",
    "Horsepower": "320hp",
    "Completed": true
}]; 

// Get all cars
router.get('/', getAllCars);

// Get cars by id
router.get('/:id', getCarById);

// Post a new car
router.post('/', createCar);

// Update car by id
router.put('/:id', updateCarById);

// Delete car by id
router.delete('/:id', deleteCarById);

module.exports = router;