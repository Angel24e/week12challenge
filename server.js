const express = require('express');

const mysql = require('mysql2');

const db = require('./config/connection');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const options = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
                name: "options"
            }
        ])
        .then(answers => {
            switch (answers.options) {
                case ("View All Employees"):
                    viewAllEmployees();
                    break;
                case ("Add Employee"):
                    addEmployee();
                    break;
                case ("Update Employee Role"):
                    updateEmployeeRole();
                    break;
                case ("View All Roles"):
                    viewAllRoles();
                    break;
                case ("Add Role"):
                    addRole();
                    break;
                case ("View All Departments"):
                    viewAllDepartments();
                    break;
                case ("Add Department"):
                    addDepartment();
                    break;
                case ("Exit"):
                    process.exit(0);
            }
        });
}

const viewAllEmployees = () => {
    const sql = `SELECT employees.id,
    employees.first_name,
    employees.last_name,
    roles.job_title,
    department.department_name,
    roles.salary,
    CONCAT(manager.first_name, '' , manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
    ORDER by employees.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        options();
    })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name",
            },
            {
                type: "input",
                message: "What is the id of the role of this employee?",
                name: "role_id",
            },
            {
                type: "input",
                message: "What is the employee id of the manager of this employee?",
                name: "manager_id",
            },
        ])
        .then(answers => {
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
            VALUES (?,?,?,?)`;
            const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

            db.query(sql, params, (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                options();
            });
        })
}

const updateEmployeeRole = () => {

    db.query("SELECT * FROM roles;", (error, roles) => {
        if (error) throw error;
        db.query('SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employees;',(error, employees) => {
            if (error) throw error;
    
            inquirer
                .prompt([
                    {
                        name: 'employee',
                        type: 'list',
                        message: 'Select the employee whose role you want to update.',
                        choices: employees.map(employee => ({ name: employee.full_name, value: employee.full_name }))
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: 'Select the new role for the employee.',
                        choices: roles.map(role => ({ name: role.title, value: role.id }))
                    }
                ])
                .then(answers => {
                    // "UPDATE employee SET role_id = ? WHERE id = ?"
                    const sql = 'UPDATE employees SET role_id = ? WHERE CONCAT(first_name, " ", last_name) = ?';

                    const params = [answers.employee, answers.role];

                    db.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        options();
                    });
                })
        })
    })
}

const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
        options();
    })
}

const addRole = () => {

    const sql = "SELECT * FROM department;";

    db.query(sql, (error, response) => {
        if (error) throw error;
        const department = response.map((dept) => ({
            name: dept.department_name,
            value: dept.id,
        }));
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the title/name of this role?",
                    name: "job_title"
                },
                {
                    type: "input",
                    message: "What is the salary of this role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What is the id of the department for this role?",
                    name: "departmentId",
                    choices: department
                }
            ])
            .then(answers => {
                const { job_title, salary, departmentId } = answers;

                db.query(
                    "INSERT INTO roles SET ?",
                    {
                        job_title,
                        salary,
                        department_id: departmentId
                    }
                )
                options();
            })
    })
}

const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        options();
    })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department you want to add?",
                name: "department_name"
            },
        ])
        .then(answers => {
            const sql = `INSERT INTO department (department_name) VALUES (?)`;
            const params = answers.department_name;

            db.query(sql, params, (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: answers
                });
            });
            options();
        })
} 

options();
