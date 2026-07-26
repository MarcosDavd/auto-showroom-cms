const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { createCar,getAllCars } = require('../controllers/autos.controllers');

const router = express.Router();

// Ruta para crear un auto con varias imágenes
router.post('/crearAuto', upload.array('images', 10), createCar);
router.get('/obtenerAutos',getAllCars);
module.exports = router;
