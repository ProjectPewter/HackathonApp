DROP DATABASE IF EXISTS hackathon_db;
CREATE DATABASE hackathon_db;

USE hackathon_db;

CREATE TABLE ideas (
  id INT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  details VARCHAR(300),
  tech VARCHAR(300),
  difficulty VARCHAR(30),
  karma INT,
  PRIMARY KEY (id)
);