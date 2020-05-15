CREATE DATABASE ng_crm_db;

USE ng_crm_db;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    card_id INT NOT NULL,
    phone INT NOT NULL,
    roll TEXT NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;