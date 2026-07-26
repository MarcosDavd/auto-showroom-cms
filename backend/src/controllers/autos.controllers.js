const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { uploadImage } = require("../services/cloudinary.service");
const fs = require('fs/promises');
require('dotenv').config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });


const createCar = async (req, res) => {
    try {
        const {
            marca,
            modelo,
            anio,
            kilometraje,
            patente,
            precio,
            descripcion
        } = req.body;

        if (! descripcion || !marca || !modelo || !anio || !kilometraje || !patente || !precio) {
            return res.status(400).json({
                message: "Faltan datos obligatorios para crear el auto",
                missing: {
                    marca: !marca,
                    modelo: !modelo,
                    anio: !anio,
                    kilometraje: !kilometraje,
                    patente: !patente,
                    precio: !precio,
                    descripcion: !descripcion
                }
            });
        }

        console.log(req.files);
        console.log(req.body);
        const files = req.files || [];
        const imageUrls = [];

        if (files.length > 0) {
            const uploadResults = await Promise.all(
                files.map((file) => uploadImage(file.path))
            );

            uploadResults.forEach((result) => {
                if (result?.secure_url) {
                    imageUrls.push(result.secure_url);
                }
            });

            await Promise.all(files.map((file) => fs.unlink(file.path)));
        }
        const existingCar = await prisma.auto.findUnique({
            where: {
                patente: patente
            }
        });
        if (existingCar) {
            return res.status(409).json({
                success: false,
                message:"Patente ya registrada",
            })
        }
        const newCar = await prisma.auto.create({
            data: {
                marca,
                modelo,
                anio: parseInt(anio, 10),
                kilometraje: parseInt(kilometraje, 10),
                patente,
                precio: parseFloat(precio),
                descripcion,
                urlImagen: imageUrls,
            }
        });

        return res.status(201).json({
            message: "Auto creado correctamente",
            data: newCar
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en el servidor"
        });
    }
};
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
module.exports = {
    createCar,
    getAllCars
};