const express =  require('express');
const app = express();
const port = 3000;
const db = require('./connect');
const nodemailer = require('nodemailer');


var bodyParser = require('body-parser');

var md5 = require('md5');
const e = require('express');

app.use(bodyParser.json())
app.get("/", (req, res) => {
  console.log("=>>>");
});


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

//SendEmail OTP
//API gửi email
//Phương thức: POST 
//URL: localhost:3000/sendEmail
//Body: {
//   "emailNguoiNhan" : "khachuong@gmail.com",
//   "tieuDe" : "Anh cho em nghi nhe",
//   "noiDung" : "Hom nay anh cho em xin nghi nhe a"
// }

app.post("/sendEmail", (req, res) => {
  //Code đoạn gửi mail
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'dinhhoang4012k1@gmail.com',
      pass: 'oaxnrbdzmxfrhykn'
    }
  });
  var content = '';
  content += `
      <div style="padding: 5px; background-color: white">
          <div style="padding: 10px; background-color: white;">
              <h4 style="color: #0085ff">Mã OTP của bạn là : Df34fa</h4>
              <span style="color: black">Đây là mail test</span>
          </div>
      </div>
  `;
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'dinhhoang4012k1@gmail.com',
      to: "hoang@yopmail.com",
      subject: 'Test nodemailer',
      html: content //Nội dung html tạo sẵn
  }

  transporter.sendMail(mainOptions, function(err, info){
      if (err) {
          console.log(err);
          // req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
          // res.redirect('/');
          res.json({status:"false"});
      } else {
          console.log('Message sent: ' +  info.response);
          // req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
          // res.redirect('/');
          res.json({status:"true"});
      }
  });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})