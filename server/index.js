

const express = require("express");
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/' , (req,res) =>{
    res.json({ status : "All good"})
})

app.post('upload/pdf' , upload.single('pdf'), (req,res) =>{
    return res.json({message : "All good"})
})

app.listen(8000 , () => {
    console.log("Connected to server" , )
})