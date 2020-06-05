CREATE DATABASE ng_crm_db;

USE ng_crm_db;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    card_id INT NOT NULL,
    code_phone TEXT NOT NULL,
    phone INT NOT NULL,
    roll TEXT NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;

CREATE TABLE requests(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_Client INT NOT NULL,
    query TEXT NOT NULL,
    solution TEXT,
    priority_color TEXT,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_requests_users (id_Client) REFERENCES users (id)
);

DESCRIBE requests;