const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "files/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        cb(null, false)
        req.error = "failed"
        return
    }
    cb(null, true);
};

const app = express();
app.use('/files', express.static(path.join(__dirname, "files")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/upload",
    multer({ storage: storage }).single('profile_pic'),
    (req, res) => {
    console.log(req.file, req.error)
    res.send('uploaded')
});

app.listen(8080, () => console.log("Running at 8080"));
