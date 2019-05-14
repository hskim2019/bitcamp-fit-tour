ALTER TABLE login_type CHANGE login_type type_name varchar(50) NOT NULL;
ALTER TABLE reservation CHANGE payment_date payment_date DATETIME NULL;
ALTER TABLE reservation CHANGE requirment requirement TEXT NULL;

