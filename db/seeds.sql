INSERT INTO department (department_name)
VALUES ("Front End"),
       ("Back End");

INSERT INTO roles (job_title, salary, department_id)
VALUES ("Junior developer", 60000, 1),
       ("Senior developer", 120000, 2),
       ("Senior developer", 100000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Beth","Johnson", 2, NULL),
       ("Andrew","Harold", 3, NULL),
       ("Jim","Slim", 1, NULL);