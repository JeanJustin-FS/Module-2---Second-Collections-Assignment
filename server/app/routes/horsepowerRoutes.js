const router = require('express').Router();

const {getAllHorsepowers,
    getHorsepowerById,
    createHorsepower,
    updateHorsepowerById,
    deleteHorsepowerById} = require('../controllers/horsepowerController');

// Sample data
const horsepower = [
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
    }]

// Get all horsepowers
router.get('/', getAllHorsepowers);

// Get horsepowers by id
router.get('/:id', getHorsepowerById);

// Post a new horsepower
router.post('/', createHorsepower);

// Update horsepower by id
router.put('/:id', updateHorsepowerById);

// Delete horsepower by id
router.delete('/:id', deleteHorsepowerById);

module.exports = router;