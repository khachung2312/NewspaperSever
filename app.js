const express = require('express');
const app = express();
const port = 3000;
const db = require('./connect');
const Parser = require('rss-parser');
const parser = new Parser();


(async () => {
    const rssLinks = [
      'https://vnexpress.net/rss/tin-moi-nhat.rss',
      'https://vnexpress.net/rss/the-thao.rss',
      'https://vnexpress.net/rss/khoa-hoc.rss',
      'https://vnexpress.net/rss/giai-tri.rss',
      'https://vnexpress.net/rss/du-lich.rss',
    ];
  
    
    for (const rssLink of rssLinks) {
      try {
        const feed = await parser.parseURL(rssLink);
  
        for (const item of feed.items) {
          const title = item.title;
          const link = item.link;
          const pubDate = item.pubDate;
          const content = item.content;
          const contentSnippet = item.contentSnippet;
          const guid = item.guid;
          const isoDate = item.isoDate;
          const category = rssLink.split('/').pop();
  
          const sqlInsert = 'INSERT INTO Posts (idUser, category, image, title, link, pubDate, content, contentSnippet, guid, isoDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const values = [0, category, "img.png", title, link, pubDate, content, contentSnippet, guid, isoDate];
  
          db.query(sqlInsert, values, (error, results) => {
            if (error) {
              console.error('Lỗi thêm bài viết:', error);
            } else {
              console.log('Bài viết đã được thêm thành công');
            }
          });
        }
      } catch (error) {
        console.error('Lỗi lấy danh sách item:', error);
      }
    }
  })();

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})