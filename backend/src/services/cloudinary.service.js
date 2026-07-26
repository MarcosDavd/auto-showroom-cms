const cloudinary = require("../config/cloudinary");

const uploadImage = async (path) => {
    const result = await cloudinary.uploader.upload(path, {
        folder: "autos",
        transformation: [
            { width: 1000, crop: "limit", quality: "auto:eco", fetch_format: "auto" }
        ]
    });

    return result;
};

module.exports = {
    uploadImage
};