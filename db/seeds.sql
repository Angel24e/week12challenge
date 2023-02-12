INSERT INTO departments (department_name)
VALUES ("Front End"),
       ("Back End");

INSERT INTO roles (role_jobTitle, role_salary, role_department)
VALUES ("Junior developer", "60,000 / year", "Front End"),
       ("Senior developer", "120,000 / year", "Back End"),
       ("Senior developer", "100,000 / year", "Back End");

INSERT INTO employees (employee_firstName, employee_lastName, employee_jobTitle, employee_department, employee_salary, employee_managers)
VALUES ("Beth","Johnson","Senior Developer","Back End","120,000 / year","None"),
       ("Andrew","Harold","Junior Developer","Front End","60,000 / year","Beth, Jim"),
       ("Jim","Slim","Senior Developer","Back End","100,000 / year","Beth",);