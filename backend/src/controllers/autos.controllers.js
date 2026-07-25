const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const getAllCars = async (req,res)=>{
    try {
        const cars = await prisma.auto.findMany();
        return res.status(200).json({
            message: 'Autos obtenidos exitosamente',
            data: cars
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los autos',
            error: error.message
        });
    }
}
const createCar = async (req, res) => {
    try {
        console.log('Datos recibidos para crear un auto:', req.body);
        const { marca, modelo, anio, kilometraje, urlImagen, patente, precio } = req.body;

        const newCar = await prisma.auto.create({
            data: {
                marca,
                modelo,
                anio: parseInt(anio, 10),
                kilometraje: parseInt(kilometraje, 10),
                urlImagen,
                patente,
                precio: parseFloat(precio)
            }
        });

        return res.status(201).json({
            message: 'Auto creado exitosamente',
            data: newCar
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el auto',
            error: error.message
        });
    }
};

module.exports = {
    createCar,
    getAllCars
};