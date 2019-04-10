DROP DATABASE IF EXISTS traps;
create database traps;
use traps;

CREATE TABLE Users (
    User_id INT PRIMARY KEY AUTO_INCREMENT,
    User_Name VARCHAR(50),
    password VARCHAR (255)
);
CREATE TABLE Trap(
    Trap_ID INT AUTO_INCREMENT PRIMARY KEY,
    Floor_ID Integer,
    Trap_type VARCHAR(20),
    Time TIMESTAMP,
    Bait_left Integer
);
CREATE TABLE Floor(
    Floor_ID INT AUTO_INCREMENT PRIMARY KEY,
    Building_ID Integer,
    Floor_name VARCHAR(20),
    Bait_left Integer
);
CREATE TABLE Building(
    Building_ID INT AUTO_INCREMENT PRIMARY KEY,
    Building_name VARCHAR(50),
    Location VARCHAR(50)
);
ALTER TABLE Floor
   ADD CONSTRAINT FK_Building_ID
   FOREIGN KEY (Building_ID) REFERENCES Building (Building_ID);
ALTER TABLE Trap
   ADD CONSTRAINT FK_Floor_ID
   FOREIGN KEY (Floor_ID) REFERENCES Floor (Floor_ID);
Insert into Users(user_name, password) VALUES ('admin','pass');