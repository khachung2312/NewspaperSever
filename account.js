const express =  require('express');
const app = express();
const port = 3000;
const db = require('./connect');

var bodyParser = require('body-parser');

var md5 = require('md5');

app.use(bodyParser.json())

app.post('/accounts/login', (req, res) => {
    
    const { email, password_of_user } = req.body;
  
    db.query('SELECT * FROM Accounts WHERE email = ? AND password_of_user = ?', [email, md5(password_of_user)], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else if (results.length === 0) {
        res.status(401).send('Tên đăng nhập hoặc mật khẩu không chính xác');
      } else {
        res.json(results[0]);
        console.log('Đăng nhập thành công');
      }
    });
});

app.post('/account/register', (req, res) => {

    console.log(req.body)
    const { email, password_of_user } = req.body;
  
    const account = { email , password_of_user };
  
    db.query('INSERT INTO Accounts (email, password_of_user) VALUES (?)', account , (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
        console.log(email);
      } else {
        res.json(results);
        console.log("Đăng kí tài khoản thành công");
      }
    });
});

app.get('/accounts', (req, res) => {
    db.query('SELECT * FROM Accounts', (error, results) => {
        if (error) {
            console.log('Lỗi truy vấn', error);
            res.status(500).send('Lỗi server')
        } else {
            res.json(results);
        }
    });    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})