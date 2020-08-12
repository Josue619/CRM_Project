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

CREATE TABLE client_services(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_Client INT NOT NULL,
    id_Product INT NOT NULL,
    code INT NOT NULL,
    fullname TEXT NOT NULL,
    state BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_client_services_users (id_Client) REFERENCES users (id),
    CONSTRAINT FOREIGN KEY fk_client_services_products (id_Product) REFERENCES products (id)
);

DESCRIBE client_services;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code INT NOT NULL,
    fullname TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE products;

CREATE TABLE supports(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_Client INT NOT NULL,
    support TEXT NOT NULL,
    in_charge TEXT NOT NULL,
    f_support DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_supports_users (id_Client) REFERENCES users (id)
);

DESCRIBE supports;

CREATE TABLE future_needs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_Client INT NOT NULL,
    future_needs TEXT NOT NULL,
    f_future_needs DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_needs_users (id_Client) REFERENCES users (id)
);

DESCRIBE future_needs;

CREATE TABLE notes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_Client INT NOT NULL,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_notes_users (id_Client) REFERENCES users (id)
);

DESCRIBE notes;}

CREATE TABLE planner(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_User INT NOT NULL,
    title TEXT NOT NULL,
    start TEXT NOT NULL,
    end TEXT,
    description TEXT NOT NULL,
    className TEXT NOT NULL,
    url TEXT,
    emailSent BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY fk_planner_users (id_User) REFERENCES users (id)
);

DESCRIBE planner;