const Horsepowers = require('../models/horsepowers')
const Horsepower = require('../models/cars')

horsepowers = [{
    "_id": "680bd5eaec979149c79149bb",
    "id": 1,
    "make": "Nissan",
    "model": "Skyline",
    "year": 1998,
    "horsepower": "340hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd614ec979149c79149bd",
    "id": 2,
    "make": "Toyota",
    "model": "Supra",
    "year": 1997,
    "horsepower": "300hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd620ec979149c79149bf",
    "id": 3,
    "make": "Mazda",
    "model": "RX-7",
    "year": 2000,
    "horsepower": "310hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bd62fec979149c79149c1",
    "id": 4,
    "make": "Audi",
    "model": "R-8",
    "year": 2008,
    "horsepower": "320hp",
    "completed": "true",
    "__v": 0
},
{
    "_id": "680bdac5791ddd240e4ef11d",
    "id": 5,
    "make": "Tesla",
    "model": "Model Y",
    "year": 2024,
    "horsepower": "350hp",
    "completed": "true",
    "__v": 0
}]

//get all cars
const getAllHorsepowers = async (req, res) => {
    console.log('GET ALL horsepowers')
    try{
        const horsepowers = await Horsepowers.find();
        res.status(200).json ({
            data: horsepowers,
            success: true,
            message: `${req.method} - Horsepower request made`
        }); 
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message: 'Error fetching horepowers', 
        });
    }
};

//get car by id
const getHorsepowerById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { horsepowers } = req.body;
        let horsepower; 
        
        if (horsepowers === "true") {
            horsepower = await Horsepower.findById(id).populate('horsepowers');
        } else {
            horsepower = await Horsepower.findById(id);
        }
        
        console.log('>>>', horsepower);
        
        if (!horsepower) {
            return res.status(404).json({ 
                message: `${req.method} - Horsepower not found`,
                success: false
            });     
        }
        
        return res.status(200).json({
            data: horsepower,
            success: true,
            message: `${req.method} - Horsepower retrieved successfully`
        });
        
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message, 
        });
    }
};

//post a new car
const createHorsepower = async (req, res) => {
    try{
        const { horsepower } = req.body;
        const user = await Horsepower.findById(horsepower.car);
        horsepower.car = user._id;
        const horsepowerData = new Horsepower(horsepower);
        user.horsepower.push(horsepowerData._id);
        const queries = (horsepowerData.save(), user.save());
        await Promise.all(queries);
        console.log('Horsepower created:', horsepowerData);
        console.log('User updated:', user);
        res.status(201).json({
            data: horsepowerData,
            success: true,
            message: `${req.method} - Horsepower created successfully`
        });
    } catch ({ message }) {
        res.status(500).json({
            success: false,
            message, 
        });
    }
};

//update car by id
const updateHorsepowerById = async (req, res) => {
    try {
        const id = req.params.id;
        const horsepower = await Horsepowers.findByIdAndUpdate(id, req.body, { new: true });
        console.log('ID is:', id);
        
        if (!horsepower) {
            return res.status(404).json({ 
                message: 'Horsepower not found',
                success: false,
                data: horsepower
            });
        }
        
        res.status(200).json({
            message: 'Update successful',
            id: id,
            data: horsepower,
            success: true
        });
    } catch (error) {
        console.error('Error updating horsepower:', error);
        res.status(500).json({
            message: 'Error updating horsepower',
            success: false,
            error: error.message
        });
    }
};

//delete car by id
const deleteHorsepowerById = async (req, res) => {
    try {
        const id = req.params.id;
        const horsepower = await Horsepowers.findByIdAndDelete(id, req.body, { new: true });
        console.log('ID is:', id);
        
        if (!horsepower) {
            return res.status(404).json({ 
                message: 'Horsepower not found',
                success: false,
                data: horsepower
            });
        }

        res.status(200).json({
            message: 'Update successful',
            id: id,
            data: horsepower,
            success: true
        });
    } catch (error) {
        console.error('Error updating horsepower:', error);
        res.status(500).json({
            message: 'Error updating horsepower',
            success: false,
            error: error.message
        });
    }
};

    module.exports = {
        getAllHorsepowers,
        getHorsepowerById,
        createHorsepower,
        updateHorsepowerById,
        deleteHorsepowerById
    };