const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten archivos de imagen JPEG, PNG o WEBP"), false);
    }
};

module.exports = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB por imagen
    },
    fileFilter
});