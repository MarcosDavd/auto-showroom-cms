const multer = require("multer");

// Esto hace que Express reciba la imagen antes de subirla
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

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