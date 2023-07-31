const express = require('express');
const app = express();
const port = 3300;
const db = require('./connect');
const Parser = require('rss-parser');
const parser = new Parser();
const multer = require('multer');




app.get('/posts', (req, res) => {
 db.query('SELECT * FROM Posts', (error, results) => {
   if (error) {
       console.error('Lỗi truy vấn:', error);
       res.status(500).send('Lỗi server');
} else {
      res.json(results);
    }
  });
});

app.get('/Category', (req, res) =>{
    db.query('SELECT * FROM Category', (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn:', error);
            res.status(500).send('Lỗi server');
     } else {
           res.json(results);
         }
       });
     });


var bodyParser = require('body-parser')

app.use(bodyParser.json())
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage });


app.post('/api/image-upload', upload.single('image'),(req, res) => {
    res.send({uploadedFileName: req.file.filename});
});

app.post('/Posts', (req, res) => {
    const sqlInsert = 'INSERT INTO posts (idUser, title, content, category, avatar) VALUES (?, ?, ?, ?, ?)';
    const { idUser, idCategory, title, content, image } = req.body;
    res.json({ message: 'Đăng bài thành công' });
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })