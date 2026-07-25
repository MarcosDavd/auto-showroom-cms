const express = require('express');
const { createCar,getAllCars } = require('../controllers/autos.controllers');

const router = express.Router();

// Ruta para crear un auto
router.post('/crearAuto', createCar);
router.get('/obtenerAutos',getAllCars);
module.exports = router;
