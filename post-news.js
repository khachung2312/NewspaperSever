const express = require('express');
const app = express();
const port = 3300;
const db = require('./connect');
const Parser = require('rss-parser');
const parser = new Parser();
const multer = require('multer');




app.get('/Posts', (req, res) => {
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
    const { IDUser, IDCategory, title, content, image } = req.body;
    console.log("Data nhan tu client: " + IDUser, IDCategory, title, content, image)
    const sqlInsert = 'INSERT INTO posts (IDUser, IDCategory, title, content,  image) VALUES (?, ?, ?, ?, ?)';
    const values = [IDUser,IDCategory, title, content, image];

    db.query(sqlInsert, values, (error, results) => {
        if (error) {
          console.error('Lỗi thêm bài viết:', error);
          res.status(500).json({ error: 'Lỗi thêm bài viết' });
          return;
        }
        console.log('Bài viết đã được thêm thành công');
        res.json({ message: 'Bài viết đã được thêm thành công', results });
      });
  
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })