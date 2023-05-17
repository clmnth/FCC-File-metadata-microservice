var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Multer GitHub repository https://github.com/expressjs/multer

// Post the file
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if(!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

    const fileInfo = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };

    res.json(fileInfo);
    
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
