const Cars = require('../models/cars')
const Car = require('../models/horsepowers')

cars = [{
    "_id": "680bd3c3cfc35f2daf9fb20d",
    "id": 1,
    "make": "Nissan",
    "model": "Skyline",
    "year": 1998,
    "horsepower": "340hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd4564fb1df97ef45d65d",
    "id": 2,
    "make": "Toyota",
    "model": "Supra",
    "year": 1997,
    "horsepower": "300hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd4664fb1df97ef45d65f",
    "id": 3,
    "make": "Mazda",
    "model": "RX-7",
    "year": 2000,
    "horsepower": "310hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd4704fb1df97ef45d661",
    "id": 4,
    "make": "Audi",
    "model": "R-8",
    "year": 2008,
    "horsepower": "320hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bdabe791ddd240e4ef11b",
    "id": 5,
    "make": "Tesla",
    "model": "Model Y",
    "year": 2024,
    "horsepower": "350hp",
    "completed": "true",
    "__v": 0
}]

//get all cars
const getAllCars = async (req, res) => {
    console.log('GET ALL cars')
    try{
        const cars = await Cars.find();
        res.status(200).json ({
            data: cars,
            success: true,
            message: `${req.method} - Car request made`
        }); 
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cars', 
        });
    }
};

//get car by id
const getCarById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { cars } = req.body;
        let car; 
        
        if (cars === "true") {
            car = await Car.findById(id).populate('cars');
        } else {
            car = await Car.findById(id);
        }
        
        console.log('>>>', car);
        
        if (!car) {
            return res.status(404).json({ 
                message: `${req.method} - Car not found`,
                success: false
            });     
        }
        
        return res.status(200).json({
            data: car,
            success: true,
            message: `${req.method} - Car retrieved successfully`
        });
        
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message, 
        });
    }
};


//post a new car
const createCar = async (req, res) => {
    try{
        const { car } = req.body;
        const carData = await Cars.create(car);
        res.status(201).json({
            data: carData,
            success: true,
            message: `${req.method} - Car created successfully`
        });
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message, 
        });
    }
};

//update car by id
const updateCarById = async (req, res) => {
    const id = (req.params.id);
    const car = await Cars.findByIdAndUpdate(id, req.body, { new: true });
    console.log('ID is:', id);
    
    if (!car) {
        return res.status(404).json({ 
            message: 'Car not found', 
            success: false, 
            data: car
        });     

    }
    res.status(200).json({ 
        message: 'Update successful', 
        id: id, 
        data: car, 
        success: true
    });
    };

//delete car by id
const deleteCarById = async (req, res) => {
    try {
        const id = req.params.id;
        const car = await Cars.findByIdAndDelete(id);
        console.log('ID is:', id);
        
        if (!car) {
            return res.status(404).json({
                message: 'Car not found',
                success: false,
                data: car
            });
        }
        
        res.status(200).json({
            message: 'Delete successful',
            id: id,
            data: car,
            success: true
        });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({
            message: 'Error deleting car',
            success: false,
            error: error.message
        });
    }
};

    module.exports = {
        getAllCars,
        getCarById,
        createCar,
        updateCarById,
        deleteCarById
    };
