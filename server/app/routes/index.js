const express = require('express');
const router = express.Router();

const carRoutes = require('./carRoutes');
const horsepowerRoutes = require('./horsepowerRoutes');

//localhost: 3000/api/v1
router.get('/', (req, res) => {
    res.status(200).json({success: true, message: `${req.method} - Request Made`});
});

//localhost: 3000/api/v1/cars
router.use('/cars', carRoutes);
//localhost: 3000/api/v1/horsepower
router.use('/horsepowers', horsepowerRoutes);

module.exports = router;