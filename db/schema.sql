DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    department_id INT NOT NULL auto_increment PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id INT NOT NULL auto_increment PRIMARY KEY,
    role_jobTitle TEXT NOT NULL,
    role_department TEXT NOT NULL,
    role_salary TEXT NOT NULL
);

CREATE TABLE employees (
    employee_id INT NOT NULL auto_increment PRIMARY KEY,
    employee_firstName TEXT NOT NULL,
    employee_lastName TEXT NOT NULL,
    employee_jobTitle TEXT NOT NULL,
    employee_department TEXT NOT NULL,
    employee_salary TEXT NOT NULL,
    employee_managers TEXT NOT NULL
    FOREIGN KEY (employee_id)
    REFERENCES roles(id)
);