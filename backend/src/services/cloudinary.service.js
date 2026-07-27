const cloudinary = require("../config/cloudinary");

const uploadImage = async (file) => {
    if (!file) {
        throw new Error("No se proporcionó un archivo");
    }

    const uploadOptions = {
        folder: "autos",
        transformation: [
            { width: 1000, crop: "limit", quality: "auto:eco", fetch_format: "auto" }
        ]
    };

    if (file.buffer) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            });

            stream.end(file.buffer);
        });
    }

    if (file.path) {
        return cloudinary.uploader.upload(file.path, uploadOptions);
    }

    throw new Error("El archivo no tiene un buffer ni una ruta válida");
};

module.exports = {
    uploadImage
};