-- Cinema Schema --

/* Running full Schema will drop the previous database and then populate it with some data.
If you want to create an empty database only run until line 60.
*/
DROP DATABASE IF EXISTS cinema;
CREATE DATABASE IF NOT EXISTS cinema;
USE cinema;

-- Movies
CREATE TABLE IF NOT EXISTS movie (
id INT AUTO_INCREMENT PRIMARY KEY,
movie_name VARCHAR(255) NOT NULL,
director VARCHAR(255) NOT NULL,
actors VARCHAR(255),
img VARCHAR(511),
classification VARCHAR(10)
);

-- Screenings
CREATE TABLE IF NOT EXISTS screening (
id INT AUTO_INCREMENT PRIMARY KEY,
screen INT DEFAULT 0,
movie_id INT NOT NULL,
show_date DATE NOT NULL,
show_time TIME NOT NULL,
FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE
);

-- Bookings
CREATE TABLE IF NOT EXISTS booking (
id INT AUTO_INCREMENT PRIMARY KEY,
fullname VARCHAR(255),
email VARCHAR(255),
no_adult INT DEFAULT 0,
no_child INT DEFAULT 0,
no_concession INT DEFAULT 0,
screening_id INT NOT NULL,
FOREIGN KEY (screening_id) REFERENCES screening(id) ON DELETE CASCADE
);

-- Posts
CREATE TABLE IF NOT EXISTS post (
id INT AUTO_INCREMENT PRIMARY KEY,
movie_id INT NOT NULL,
title VARCHAR(255),
body VARCHAR(511),
rating INT CHECK (rating<=5 AND rating>=1),
fullname VARCHAR(255),
FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE
);

-- Emails
CREATE TABLE IF NOT EXISTS email_form (
id INT AUTO_INCREMENT PRIMARY KEY,
fullname VARCHAR(255),
title VARCHAR(255),
body VARCHAR(511),
email VARCHAR(255)
);

-- Populuation of data --

-- Movies 
INSERT INTO movie (movie_name, director, actors, img, classification) VALUES
('Doctor Strange in the Multiverse of Madness', 'Sam Raimi', 'Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong', 'https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY1200_CR90,0,630,1200_AL_.jpg', 'PG-13'),
('The Godfather', 'Francis Ford Coppola','Marlon Brando, Al Pacino, James Caan', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg', '15'),
('The Incredibles', 'Brad Bird','Craig T. Nelson, Samuel L. Jackson, Holly Hunter', 'https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_.jpg', 'PG');

-- Screenings
INSERT INTO screening (screen, movie_id, show_date, show_time) VALUES
(1, 2, '2022-06-10', '10:30:00'),
(1, 2, '2022-06-10', '15:30:00'),
(2, 3, '2022-06-10', '10:30:00'),
(2, 3, '2022-06-10', '20:00:00'),
(1, 1, '2022-06-10', '20:00:00'),
(2, 1, '2022-06-10', '15:30:00');

-- Bookings
INSERT INTO booking (fullname, email, no_adult, no_child, no_concession, screening_id) VALUES
('Shafeeq', 'shafeeq@shafeeq.com', 10, 5, 3, 1),
('James Bond', 'JBond@hotmail.wav.uk', 1, 0, 0, 4),
('Alan Alanson', 'AlanAlan@Alan.alan', 0, 1, 0, 6);

-- Posts
INSERT INTO post (movie_id, title, body, rating, fullname) VALUES
(2,'Amazing Film', "Look what they've done to my boy", 5, "Mohamed Javaleil"),
(1,"Gave me a fit", "It's quite epileptic inducing I think", 3, "Greg"),
(3,"Cool!", "Love me a bit of dash, i do", 5, "Jimbob");

-- Emails
INSERT INTO email_form (fullname, title, body, email) VALUES
("Jenny Jenkins", "Huh?", "How do I use your complicated website?", null),
("Merisa B", "MMMMmmmmm", "Hmmmmmmmmm.....", "MerisaB@MicrosoftOffice.com"),
("Jimbob", "Terribel", "They didn't let me watch Godfather in 3d!!!", "Jimbob@school.co.org.uk");

SELECT * FROM movie;
SELECT * FROM screening;
SELECT * FROM booking;
SELECT * FROM post;
SELECT * FROM email_form;