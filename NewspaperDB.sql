create database Newspaper;
use Newspaper;

create table Posts (
id int auto_increment primary key,
idUser int,
category varchar(100),
image varchar(1000),
title varchar(100),
link varchar(1000),
pubDate varchar(100),
content text,
contentSnippet text,
guid varchar (1000),
isoDate varchar(100)


);

-- insert into Posts(idUser, category, image, title, link, pubDate, content, contentSnippet, guid, isoDate) values 
-- ('1', 'Thời sự', 'img.png', 'Chao buoi sang','http//baomoi.copm',  'Sat, 29 Jul 2023 18:00:00 +0700', 'Chao ngay moi', 'hello', 'huong dan', '07:15');

select * from Posts

DELETE FROM Posts WHERE id > 0;