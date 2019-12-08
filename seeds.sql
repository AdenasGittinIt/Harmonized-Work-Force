
INSERT INTO department
    (department_name)
VALUES
    ('Sales'),
    ('Client Relations'),
    ('Finance'),
    ('Egineering'),
    ('Human Resources');
INSERT INTO role
    ( title, salary, department_id)
VALUES
    ('VP Sales', 200000, 1),
    ('Salesperson', 80000, 1),
    ('Cleint Relations Manager',80000, 2),
    ('Client Service Representative', 50000, 2),
    ('Chief Financial Officer', 200000, 3),
    ('Accountant', 80000, 3),
    ('Accounts Receivable Clerk', 65000, 3),
    ('Accounts Payable Clerk', 65000, 3),
    ('Cheif Engineer', 210000, 4),
    ('Egineer', 120000, 4),
    ('VP Human Resources', 190000, 5),
    ('Human Resource Generalist', 65000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carl', 'Daniels', 1, NULL),
    ('Ike', 'Carren', 2, 1),
    ('Ashley', 'Banks', 3, NULL),
    ('Kevin', 'Tanner', 4, 3),
    ('Kyle', 'Rodriguez', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sheila', 'Marrit', 7, 5),
    ('Alexandra', 'Morris', 8, 5),
    ('Malia', 'Brown', 9, NULL),
    ('Sheila', 'Marrit', 10, 9),
    ('Arnold', 'Palmroy', 11, NULL),
    ('Raymond', 'Cox', 12, 11);