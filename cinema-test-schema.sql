DROP TABLE IF EXISTS email_form;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS screening;
DROP TABLE IF EXISTS movie;
CREATE TABLE IF NOT EXISTS movie (
id INT AUTO_INCREMENT PRIMARY KEY,
movie_name VARCHAR(255) NOT NULL,
director VARCHAR(255) NOT NULL,
actors VARCHAR(255),
img VARCHAR(511),
classification VARCHAR(10)
);
CREATE TABLE IF NOT EXISTS screening (
id INT AUTO_INCREMENT PRIMARY KEY,
screen INT DEFAULT 0,
movie_id INT NOT NULL,
show_date DATE NOT NULL,
show_time TIME NOT NULL,
FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE
);
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
CREATE TABLE IF NOT EXISTS post (
id INT AUTO_INCREMENT PRIMARY KEY,
movie_id INT NOT NULL,
title VARCHAR(255),
body VARCHAR(511),
rating INT CHECK (rating<=5 AND rating>=1),
fullname VARCHAR(255),
FOREIGN KEY (movie_id) REFERENCES movie (id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS email_form (
id INT AUTO_INCREMENT PRIMARY KEY,
fullname VARCHAR(255),
title VARCHAR(255),
body VARCHAR(511),
email VARCHAR(255)
);
INSERT INTO movie (movie_name, director, actors, img, classification) VALUES
('Doctor Strange in the Multiverse of Madness', 'Sam Raimi', 'Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong', 'https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY1200_CR90,0,630,1200_AL_.jpg', 'PG-13');
INSERT INTO screening (screen, movie_id, show_date, show_time) VALUES
(2, 1, '2022-06-10', '10:30:00');
INSERT INTO booking (fullname, email, no_adult, no_child, no_concession, screening_id) VALUES
('Shafeeq', 'shafeeq@shafeeq.com', 10, 5, 3, 1);
INSERT INTO post (movie_id, title, body, rating, fullname) VALUES
(1,'Amazing Film', "Look what they've done to my boy", 5, "Mohamed Javaleil");
INSERT INTO email_form (fullname, title, body, email) VALUES
("Jenny Jenkins", "Huh?", "How do I use your complicated website?", null);