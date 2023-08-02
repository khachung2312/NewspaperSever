const express = require('express');
const app = express();
const port = 3300;
const db = require('./connect');

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/posts/search', (req, res) => {
  const title = req.query.title;

  const sqlSearch = `SELECT * FROM Posts WHERE title LIKE '%${title}%'`;
  db.query(sqlSearch, (error, results) => {
    if (error) {
      console.error('Lỗi tìm kiếm bài viết:', error);
      res.status(500).json({ error: 'Lỗi tìm kiếm bài viết' });
      return;
    }
    console.log('Kết quả tìm kiếm:', results);
    res.json(results);
  });
});

app.post('/saveWord', (req, res) => {

  const {IDUser, keyWord, dateTime} = req.body;
  const historyKeyWord = {IDUser, keyWord, dateTime};

  db.query('insert into HistorySearchs SET ?',historyKeyWord , (error, results) => {
    if (error) {
      console.error('Lỗi lưu:', error);
      res.status(500).json({ error: 'Lỗi lưu' });
      return;
    }
    console.log('Lưu thành công');
    res.json({ message: 'Lưu thành công' });
  });
});

app.get('/saveWord/history', (req, res) => {

  const sqlSearch = `SELECT * FROM HistorySearchs`;
  db.query(sqlSearch, (error, results) => {
    if (error) {
      console.error('Lỗi tìm kiếm lịch sử:', error);
      res.status(500).json({ error: 'Lỗi tìm kiếm lịch sử' });
      return;
    }
    console.log('Kết quả tìm kiếm:', results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})