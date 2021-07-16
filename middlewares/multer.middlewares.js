const multer = require("multer");
const path = require('path');
const { GENERAL } = require("@app/constants");

const debug = require("debug")("app:multer-middleware")

const middleware = {};

const storage = (pathField, subfolder="") => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads${subfolder}`);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        req.body[pathField] = `/uploads${subfolder}/${filename}`;
        cb(null, filename);
    }
});

const fileImageFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const fileAudioFilter = (req, file, cb) => {
  if (file.mimetype == 'audio/mpeg') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const fileJSONFilter = (req, file, cb) => { 
    if (file.mimetype === "application/json") {
        cb(null, true);
    } else { 
        cb(null, false)
    }
}

middleware.uploadImage = pathField => multer({ storage: storage(pathField, "/images"), fileFilter: fileImageFilter });
middleware.uploadAudio = pathField => multer({ storage: storage(pathField, "/audios"), fileFilter: fileAudioFilter });
middleware.uploadJSON = multer({ fileFilter: fileJSONFilter });
middleware.JSONfileToField= field => (req, res, next) => { 
    const { file } = req;

    if (file) { 
        req.body[field] = JSON.parse(file.buffer.toString());
    }
    
    next();
}

module.exports = middleware;