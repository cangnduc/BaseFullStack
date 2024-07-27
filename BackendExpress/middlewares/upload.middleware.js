const multr = require("multer");
const path = require("path");

const storage = multr.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split(".")[0] + "-" + Date.now() + path.extname(file.originalname));
    },
});

//check file type
const fileFilter = (req, file, cb) => {
    console.log("it goes here");
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
};

const upload = multr({ storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 },
    
 });

module.exports = upload;