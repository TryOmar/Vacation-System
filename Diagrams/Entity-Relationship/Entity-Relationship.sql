CREATE TABLE `employees` (
  `employee_id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `hire_date` date,
  `job_id` int,
  `department_id` int
);

CREATE TABLE `departments` (
  `department_id` int PRIMARY KEY AUTO_INCREMENT,
  `department_name` varchar(255),
  `manager_id` int
);

CREATE TABLE `jobs` (
  `job_id` int PRIMARY KEY AUTO_INCREMENT,
  `job_title` varchar(255),
  `min_salary` int,
  `max_salary` int
);

CREATE TABLE `vacations` (
  `vacation_id` int PRIMARY KEY AUTO_INCREMENT,
  `employee_id` int,
  `start_date` date,
  `end_date` date,
  `type` varchar(255),
  `status` varchar(255)
);

CREATE TABLE `vacation_requests` (
  `request_id` int PRIMARY KEY AUTO_INCREMENT,
  `employee_id` int,
  `vacation_id` int,
  `request_date` date,
  `status` varchar(255)
);

CREATE TABLE `approvals` (
  `approval_id` int PRIMARY KEY AUTO_INCREMENT,
  `request_id` int,
  `approver_id` int,
  `approval_date` date,
  `status` varchar(255)
);

CREATE TABLE `managers` (
  `manager_id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `department_id` int
);

ALTER TABLE `employees` ADD FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`);

ALTER TABLE `employees` ADD FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

ALTER TABLE `departments` ADD FOREIGN KEY (`manager_id`) REFERENCES `managers` (`manager_id`);

ALTER TABLE `vacations` ADD FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

ALTER TABLE `vacation_requests` ADD FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

ALTER TABLE `vacation_requests` ADD FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`);

ALTER TABLE `approvals` ADD FOREIGN KEY (`request_id`) REFERENCES `vacation_requests` (`request_id`);

ALTER TABLE `approvals` ADD FOREIGN KEY (`approver_id`) REFERENCES `managers` (`manager_id`);
