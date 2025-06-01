

const express = require("express");
const cors = require('cors');
const multer = require('multer');
const {Queue} = require("bullmq");
const path = require("path");

const queue = new Queue('file-upload-queue', {
  connection: {
    host: 'localhost',
    port: '6379',
  },
});

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

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
 await queue.add('file-ready' , JSON.stringify({
        filename : req.files?.originalname,
        destination : req.file.destination,
        path : req.file.path
    }))
    return res.json({ message: 'uploaded' });
});

app.listen(8000 , () => {
    console.log("Connected to server" , )
})