create database Newspaper;
use Newspaper;

DROP database Newspaper;

CREATE TABLE Users (
  IDUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email CHAR(100),
  full_name CHAR(100),
  date_of_birth DATE
);

CREATE TABLE Accounts (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  email CHAR(100) NOT NULL UNIQUE,
  IDUser INT,
  password_of_user CHAR(100) NOT NULL,
  status_account CHAR(30),
  CONSTRAINT fk_users FOREIGN KEY (IDUser) REFERENCES Users(IDUser)
);

DELIMITER //
CREATE TRIGGER tr_users_before_insert
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
  DECLARE user_exists INT;
  
  SELECT COUNT(*) INTO user_exists
  FROM Users
  WHERE IDUser = NEW.IDUser;
  
  IF user_exists > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Dữ liệu đã tồn tại.';
  END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_accounts_before_insert
BEFORE INSERT ON Accounts
FOR EACH ROW
BEGIN
  DECLARE account_exists INT;
  
  SELECT COUNT(*) INTO account_exists
  FROM Accounts
  WHERE email = NEW.email;
  
  IF account_exists > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Dữ liệu đã tồn tại.';
  END IF;
END;
//
DELIMITER ;

INSERT INTO Users (email, full_name)
VALUES
('vnexpress@gmail.com', 'EXPRESS VN'),
  ('linhnm@gmail.com', 'Nguyen Manh Linh'),
  ('hungnk@gmail.com', 'Nguyen Khac Hung'),
  ('minhvn@gmail.com', 'Vu Ngoc Minh'),
  ('duanvd@gmail.com', 'Vu Dinh Duan'),
  ('phuonggt@gmail.com', 'Giap Thi Phuong'),
  ('linhld@gmail.com', 'Le Dinh Linh'),
  ('hoangdt@gmail.com', 'Dinh Tien Hoang');
  
INSERT INTO Users (email, full_name)
VALUES
('linhmanhng@gmail.com', 'Nguyen Manh Linh');

INSERT INTO Accounts (email, IDUser, password_of_user, status_account)
VALUES
('vnexpress@gmail.com', (SELECT IDUser FROM Users WHERE email = 'vnexpress@gmail.com'), MD5('VNExpress0000'), 'active'),
  ('linhnm@gmail.com', (SELECT IDUser FROM Users WHERE email = 'linhnm@gmail.com'), MD5('123456'), 'active'),
  ('hungnk@gmail.com', (SELECT IDUser FROM Users WHERE email = 'hungnk@gmail.com'), MD5('123456'), 'active'),
  ('minhvn@gmail.com', (SELECT IDUser FROM Users WHERE email = 'minhvn@gmail.com'), MD5('123456'), 'active'),
  ('duanvd@gmail.com', (SELECT IDUser FROM Users WHERE email = 'duanvd@gmail.com'), MD5('123456'), 'active'),
  ('phuonggt@gmail.com', (SELECT IDUser FROM Users WHERE email = 'phuonggt@gmail.com'),MD5('123456'), 'active'),
  ('linhld@gmail.com', (SELECT IDUser FROM Users WHERE email = 'linhld@gmail.com'), MD5('123456'), 'active'),
  ('hoangdt@gmail.com', (SELECT IDUser FROM Users WHERE email = 'hoangdt@gmail.com'), MD5('123456'), 'active');
  
INSERT INTO Accounts (email, IDUser, password_of_user, status_account)
VALUES
('linhmanhng@gmail.com', (SELECT IDUser FROM Users WHERE email = 'linhmanhng@gmail.com'), MD5('123456'), 'ative');

SELECT *
FROM Users
INNER JOIN Accounts ON Users.email = Accounts.email;


create table Category (
IDCategory int primary key,
nameCategory varchar(100)
);

insert into Category(idCategory, nameCategory) values 
(1, 'Mới nhất'),
(2, 'Thế giới'),
(3, 'Thể thao'),
(4, 'Khoa học'),
(5, 'Pháp luật'),
(6, 'Giải trí'),
(7, 'Du lịch');

create table Status (
IDStatus int primary key,
status varchar(100)
);

insert into Status(idStatus, status) values 
(1, 'Đã đăng'),
(2, 'Đang đăng'),
(3, 'Đang hoạt động'),
(4, 'Không hoạt động'),
(5, 'Thành công'),
(6, 'Không thành công'),
(7, 'Có kết quả'),
(8, 'Không có kết quả');

create table Posts (
IDPosts int auto_increment primary key,
IDUser int,
IDCategory int,
IDStatus int,
image varchar(1000),
title varchar(100),
link varchar(1000),
pubDate varchar(100),
content text,
contentSnippet text,
guid varchar (1000),
isoDate varchar(100),
foreign key (IDUser) references Users(IDUser),
foreign key (IDCategory) references Category(IDCategory),
foreign key (IDStatus) references Status(IDStatus)
);


create table Comments(
IDComment integer primary key not null,
IDUser int not null,
IDPost int not null,
content varchar(255) not null,
pupdate varchar(50) not null,
IDStatus int not null,
foreign key (IDUser) references Users(IDUser),
foreign key (IDStatus) references Status(IDStatus),
foreign key (IDPost) references Posts(IDPosts)
);


insert into Comments(IDComment, IDUser, IDPost, content, pupdate, IDStatus) values
(1, 1, 1, 'Làm việc với tỉnh Hậu Giang, Bộ trưởng Huỳnh Thành Đạt đề xuất các giải pháp để khoa học công nghệ 
trở thành động lực, tạo ra những giải pháp đột phá, thúc đẩy phát triển kinh tế.', '2023/07/20', 1 ),
(2, 2, 1, 'GS Nguyễn Cửu Khoa dùng công nghệ nano hóa dược chất trong thuốc y học cổ truyền, giúp tăng hiệu quả, 
giảm thời gian điều trị so với thuốc đông y truyền thống.', '2023/07/20', 2),
(3, 3, 1, 'Đại học quốc gia TP HCM ký hợp tác với tỉnh Hậu Giang nhằm đẩy mạnh hoạt động khoa học công nghệ, đổi mới sáng tạo,
 trong đó chú trọng đào tạo nhân lực.', '2023/07/20', 3 );


select * from Posts;
select * from Category;
select * from Status;

DELETE FROM Posts WHERE IDPosts > 0;