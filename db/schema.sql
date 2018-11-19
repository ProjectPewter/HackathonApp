USE users_db;

CREATE TABLE ideas (
 id INT AUTO_INCREMENT,
 name VARCHAR(50) NOT NULL,
 details VARCHAR(300),
 tech VARCHAR(300),
 difficulty INT,
 created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 votes INT DEFAULT 0,
 PRIMARY KEY (id)
);

CREATE TABLE users (
   id INT AUTO_INCREMENT NOT NULL,
   email VARCHAR(100) NOT NULL,
   username VARCHAR(15) NOT NULL,
   password BINARY(60),
   pinnedTable VARCHAR(30),
   PRIMARY KEY(id)
);

CREATE TABLE pinned (
  id INT,
  pin int
);