CREATE DATABASE database1;
USE database1;

CREATE TABLE user(user_id int AUTO_INCREMENT PRIMARY KEY,
				  username varchar(255) NOT NULL,
				  email varchar(255) UNIQUE NOT NULL,
                  password varchar(255) NOT NULL,
                  user_location varchar(255),
                  user_type ENUM('admin','publisher', 'guest') NOT NULL
);
                  
CREATE TABLE event(event_id int AUTO_INCREMENT PRIMARY KEY,
				   event_publisher_id INT NOT NULL,
				   event_name varchar(255),
                   upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   event_location varchar(255),
                   event_start_time DATETIME NOT NULL,
                   event_end_time DATETIME,
                   event_cost ENUM('FREE', '$', '$$', '$$$', '$$$$') NOT NULL,
                   event_description TEXT,
                   FOREIGN KEY (event_publisher_id) REFERENCES user(user_id)
);
CREATE TABLE reviews(review_id INT AUTO_INCREMENT PRIMARY KEY,
					 user_id INT NOT NULL,
                     event_id INT NOT NULL,
                     review_img VARCHAR(255),
                     review_rating TINYINT,
                     review_description TEXT,
                     FOREIGN KEY (user_id) REFERENCES user(user_id),
                     FOREIGN KEY (event_id) REFERENCES event(event_id)
);

SHOW TABLES;
DESCRIBE reviews;

