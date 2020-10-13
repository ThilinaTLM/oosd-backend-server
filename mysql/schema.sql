-- Clean DB -------------------------------------------------------------------------------------------
SET GLOBAL log_bin_trust_function_creators = 1;
USE cms;

-- Clean Database -------------------------------------------------------------------------------------------
DROP VIEW IF EXISTS complaint_full_details;
DROP VIEW IF EXISTS accounts;
DROP VIEW IF EXISTS complaints_with_divisions;

DROP PROCEDURE IF EXISTS AddAccount;
DROP PROCEDURE IF EXISTS AddComplaint;
DROP PROCEDURE IF EXISTS AssignDivision;
DROP PROCEDURE IF EXISTS UpdateDivision;
DROP PROCEDURE IF EXISTS UpdateComplaint;
DROP PROCEDURE IF EXISTS UpdateComplaintStatus;
DROP PROCEDURE IF EXISTS UpdateComplaintLog;

DROP FUNCTION IF EXISTS GetAttachmentsAsArray;
DROP FUNCTION IF EXISTS GetLogsAsArray;
DROP FUNCTION IF EXISTS GetUserFullName;
DROP FUNCTION IF EXISTS GenerateReferenceNo;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS complaint_attachment;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS complaint_log;
DROP TABLE IF EXISTS complaint_assignment;
DROP TABLE IF EXISTS complaints;

DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS customers;

DROP TABLE IF EXISTS grama_niladhari_offices;
DROP TABLE IF EXISTS divisional_offices;

DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS complaint_states;
DROP TABLE IF EXISTS complaint_types;

-- ---------------------------------------------------------------------------------------------------------------------
--                                     ____   __    ____  __    ____  ___
--                                    (_  _) /__\  (  _ \(  )  ( ___)/ __)
--                                      )(  /(__)\  ) _ < )(__  )__) \__ \
--                                     (__)(__)(__)(____/(____)(____)(___/
-- ---------------------------------------------------------------------------------------------------------------------

-- complaint types -----------------------------------------------------------------------------------------------------
CREATE TABLE complaint_types (
	type VARCHAR(50),
	description VARCHAR(255),

	PRIMARY KEY(type)
) ENGINE = InnoDB;

-- complaint states ----------------------------------------------------------------------------------------------------
CREATE TABLE complaint_states (
	state VARCHAR(50),
	description VARCHAR(255),

	PRIMARY KEY(state)
) ENGINE = InnoDB;

-- users roles ---------------------------------------------------------------------------------------------------------
CREATE TABLE user_roles (
  role VARCHAR(100) NOT NULL,
  description VARCHAR(255),

  PRIMARY KEY (role)
)
ENGINE = InnoDB;

-- Divisional Offices --------------------------------------------------------------------------------------------------
CREATE TABLE divisional_offices (
    name VARCHAR(100) NOT NULL,
    address TEXT,
    PRIMARY KEY (name)
)
ENGINE = InnoDB;

CREATE UNIQUE INDEX name_UNIQUE ON divisional_offices (name ASC );

-- Grama Niladhari Offices ---------------------------------------------------------------------------------------------
CREATE TABLE grama_niladhari_offices (
    name VARCHAR(100) NOT NULL,
    address TEXT,
    PRIMARY KEY (name)
)
ENGINE = InnoDB;

CREATE UNIQUE INDEX name_UNIQUE ON grama_niladhari_offices (name ASC );

-- Customers -----------------------------------------------------------------------------------------------------------
CREATE TABLE customers (
    customer_id VARCHAR(36) NOT NULL,
    full_name TEXT NOT NULL,
    nic VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    telephone VARCHAR(12),
    address TEXT,

    divisional_office VARCHAR(100) NOT NULL,
    gn_office VARCHAR(100),

    PRIMARY KEY (customer_id),

    CONSTRAINT fk_div_office
        FOREIGN KEY (divisional_office)
        REFERENCES divisional_offices (name)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT fk_gn_office
    FOREIGN KEY (gn_office)
        REFERENCES grama_niladhari_offices (name)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE UNIQUE INDEX nic_UNIQUE ON customers (nic ASC);
CREATE INDEX fk_divisional_office_x ON customers (divisional_office ASC);
CREATE INDEX fk_gn_office_x ON customers (gn_office ASC);

-- users ---------------------------------------------------------------------------------------------------------------
CREATE TABLE users (
  user_id VARCHAR(36) NOT NULL,
  role VARCHAR(100) NOT NULL,

  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telephone_number VARCHAR(12),
  office VARCHAR(100),
  
  PRIMARY KEY (user_id),
 
  CONSTRAINT fk_office_id
    FOREIGN KEY (office)
    REFERENCES divisional_offices (name)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

  CONSTRAINT fk_role
      FOREIGN KEY (role)
      REFERENCES user_roles (role)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE INDEX fk_office_x ON users (office ASC);

-- credentials ---------------------------------------------------------------------------------------------------------
CREATE TABLE credentials (
    user_id VARCHAR(36),
    username VARCHAR(50) NOT NULL,
    hash VARCHAR(60) NOT NULL,
    verified TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY(user_id),

    CONSTRAINT fk_credentials_id
            FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE UNIQUE INDEX idx_username ON credentials (username ASC);


-- complaints ----------------------------------------------------------------------------------------------------------
CREATE TABLE complaints (
    complaint_id VARCHAR(36) NOT NULL,
    ref_no VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,

    customer_id VARCHAR(36),
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),

    PRIMARY KEY (complaint_id),

    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	
    CONSTRAINT fk_status
    	FOREIGN KEY (status)
    	REFERENCES complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT fk_type
        FOREIGN KEY (type)
        REFERENCES complaint_types(type)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX fk_customer_idx ON complaints (customer_id ASC);
CREATE INDEX fk_status_x ON complaints ( status ASC);
CREATE UNIQUE INDEX ref_no_unique ON complaints (ref_no ASC);

-- complaint division --------------------------------------------------------------------------------------------------
CREATE TABLE complaint_assignment (
    complaint_id VARCHAR(36) NOT NULL,
    assigned_div VARCHAR(100) NOT NULL,
    assigned_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),

    PRIMARY KEY(complaint_id),

    CONSTRAINT fk_assigned_div
        FOREIGN KEY (assigned_div)
        REFERENCES divisional_offices (name)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT fk_ca_complaint_id
        FOREIGN KEY (complaint_id)
        REFERENCES complaints (complaint_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX fk_assign_to_idx ON complaint_assignment (assigned_div ASC);

-- complaint log -------------------------------------------------------------------------------------------------------
CREATE TABLE complaint_log (
    id INT UNSIGNED AUTO_INCREMENT,
    complaint_id VARCHAR(36) NOT NULL,
    update_by VARCHAR(36), -- user id
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    subject VARCHAR(255),
    description TEXT,

    PRIMARY KEY(id),

    CONSTRAINT fk_log_complaint_id
        FOREIGN KEY (complaint_id)
        REFERENCES complaints (complaint_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT fk_log_complaint_updater
            FOREIGN KEY (update_by)
            REFERENCES users (user_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX fk_cl_com_id_idx ON complaint_log (complaint_id ASC);

-- attachments ---------------------------------------------------------------------------------------------------------
CREATE TABLE attachments (
    attachment_id VARCHAR(36),
    original_name VARCHAR(255),
    content_type VARCHAR(100),
    PRIMARY KEY (attachment_id)
) ENGINE = InnoDB;

-- attachment complaint -------------------------------------------------------------------------------------------------------
CREATE TABLE complaint_attachment (
    complaint_id VARCHAR(36),
    attachment_id VARCHAR(36),

    PRIMARY KEY (complaint_id, attachment_id),

    CONSTRAINT fk_ac_com_id
            FOREIGN KEY (complaint_id)
            REFERENCES complaints(complaint_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,

    CONSTRAINT fk_ac_att_id
                FOREIGN KEY (attachment_id)
                REFERENCES attachments(attachment_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX fk_ca_com_id_idx ON complaint_attachment (complaint_id ASC);

-- notifications -------------------------------------------------------------------------------------------------------
CREATE TABLE notifications (
    notification_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL, -- need to add notification types
    read_time TIMESTAMP,
    title VARCHAR(255),
    message TEXT,
    
    PRIMARY KEY(notification_id),

    CONSTRAINT fk_notification_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX fk_notification_user_idx ON notifications (user_id ASC);

-- ---------------------------------------------------------------------------------------------------------------------
--                         ____  __  __  _  _  ___  ____  ____  _____  _  _  ___
--                        ( ___)(  )(  )( \( )/ __)(_  _)(_  _)(  _  )( \( )/ __)
--                         )__)  )(__)(  )  (( (__   )(   _)(_  )(_)(  )  ( \__ \
--                        (__)  (______)(_)\_)\___) (__) (____)(_____)(_)\_)(___/
-- ---------------------------------------------------------------------------------------------------------------------

DELIMITER //

CREATE FUNCTION GenerateReferenceNo (
    type VARCHAR(50)
)
RETURNS VARCHAR(50)
BEGIN
    DECLARE datetime_now TIMESTAMP;
    DECLARE this_month, this_year VARCHAR(2);
    DECLARE pointer, preText VARCHAR(4);

    SET datetime_now = CURRENT_TIMESTAMP();
    SET this_month = CAST(EXTRACT(MONTH FROM CURRENT_TIMESTAMP()) AS CHAR(2));
    SET this_year = SUBSTRING( CAST(EXTRACT(YEAR FROM datetime_now) AS CHAR(4)) , 3, 2);
    SELECT LPAD(CAST((COUNT(*) + 1) AS CHAR(4)), 4, 0) INTO pointer FROM complaints WHERE type = type AND (EXTRACT(MONTH FROM created_date) = EXTRACT(MONTH FROM datetime_now));

    IF type = 'Direct to District' THEN
        SET preText = 'DDIS';
    ELSEIF type = 'Direct to Division' THEN
        SET preText = 'DDIV';
    END IF;

    RETURN CONCAT(preText, '/', this_year, '/', this_month, '/', pointer );
END //


CREATE FUNCTION GetUserFullName (
    user_id VARCHAR(36)
)
RETURNS VARCHAR(100)
BEGIN
	DECLARE full_name VARCHAR(100);
	SELECT CONCAT(first_name, ' ', last_name) INTO full_name FROM users u WHERE u.user_id = user_id LIMIT 1;
    RETURN full_name;
END //

CREATE FUNCTION GetLogsAsArray (
    complaint_id VARCHAR(36)
)
RETURNS JSON
BEGIN
    DECLARE logs JSON;
	SELECT CONCAT( '[', GROUP_CONCAT(JSON_OBJECT(
            		'subject', cl.subject,
            		'description', cl.description,
            		'update_by', cl.update_by,
            		'update_by_name', GetUserFullName(cl.update_by),
            		'update_at', cl.update_at
            	)), ']') INTO logs
            	FROM complaint_log cl WHERE cl.complaint_id = complaint_id GROUP BY cl.complaint_id;
    RETURN logs;
END //

CREATE FUNCTION GetAttachmentsAsArray (
    complaint_id VARCHAR(36)
)
RETURNS JSON
BEGIN
    DECLARE attachments JSON;
	SELECT CONCAT( '[', GROUP_CONCAT( CONCAT('"', ca.attachment_id, '"')), ']') INTO attachments
            FROM complaint_attachment ca WHERE ca.complaint_id = complaint_id GROUP BY ca.complaint_id;
    RETURN attachments;
END //

DELIMITER ;

-- ---------------------------------------------------------------------------------------------------------------------
--                     ____  ____  _____  ___  ____  ____  __  __  ____  ____  ___
--                    (  _ \(  _ \(  _  )/ __)( ___)(  _ \(  )(  )(  _ \( ___)/ __)
--                     )___/ )   / )(_)(( (__  )__)  )(_) ))(__)(  )   / )__) \__ \
--                    (__)  (_)\_)(_____)\___)(____)(____/(______)(_)\_)(____)(___/
-- ---------------------------------------------------------------------------------------------------------------------

-- Add Account ---------------------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE AddAccount (
    IN user_id VARCHAR(36),
    IN role VARCHAR(100),

    IN first_name VARCHAR(50),
    IN last_name VARCHAR(50),
    IN email VARCHAR(100),
    IN telephone_number VARCHAR(12),
    IN office VARCHAR(100),

    IN username VARCHAR(50),
    IN hash VARCHAR(60),
    IN verified TINYINT
)
BEGIN
	INSERT INTO users VALUES (user_id, role, first_name, last_name, email, telephone_number, office);
	INSERT INTO credentials VALUES (user_id, username, hash, verified);
END //

DELIMITER ;

-- Add a new Complaint : Direct Division ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE AddComplaint (
    IN complaint_id VARCHAR(36),
    IN ref_no VARCHAR(50), -- auto or refNo
    IN type VARCHAR(36),

    IN customer_id VARCHAR(36),
    IN subject VARCHAR(255),
    IN description TEXT,
    IN assigned_div VARCHAR(100) -- none or Division
)
BEGIN
    DECLARE initial_status VARCHAR(50);

    IF ref_no = 'auto' THEN
       SELECT GenerateReferenceNo(type) INTO ref_no;
    END IF;

    IF type = 'Direct to Division' THEN
        SET initial_status = 'Awaiting Accept';
    ELSE
        SET initial_status = 'Draft';
    END IF;

    INSERT INTO complaints
        VALUES (complaint_id, ref_no, type, customer_id, subject, description, initial_status, CURRENT_TIMESTAMP());

    IF EXISTS(SELECT * FROM divisional_offices WHERE name = assigned_div) THEN
        INSERT INTO complaint_assignment VALUES (complaint_id, assigned_div, CURRENT_TIMESTAMP());
    END IF;

END //

DELIMITER ;

-- Assign Division in Complaint ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE AssignDivision (
    IN complaint_id VARCHAR(36),
    IN assigned_div VARCHAR(100),
    IN user_id VARCHAR(36)
)
BEGIN
    INSERT INTO complaint_assignment VALUES (complaint_id, assigned_div, CURRENT_TIMESTAMP());
    INSERT INTO complaint_log (complaint_id, update_by, update_at, subject, description)
                    VALUES (complaint_id, user_id, CURRENT_TIMESTAMP(),
                    'Assigned to Division',
                    'Complaint is assigned to a divisional secretariat office.');
END //

DELIMITER ;

-- Update Assigned Division in Complaint ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE UpdateDivision (
    IN complaint_id VARCHAR(36),
    IN assigned_div VARCHAR(100),
    IN user_id VARCHAR(36)
)
BEGIN
    UPDATE complaint_assignment
        SET assigned_div = assigned_div,
            assigned_date = CURRENT_TIMESTAMP()
        WHERE complaint_id = complaint_id;

    INSERT INTO complaint_log (complaint_id, update_by, update_at, subject, description)
        VALUES ( complaint_id, user_id, CURRENT_TIMESTAMP(),
        'Reassigned to Division',
        'Divisional secretariat office assignment of the complaint is updated.');
END //

DELIMITER ;

-- Log Complaint ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE UpdateComplaintLog (
    IN complaint_id VARCHAR(36),
    IN user_id VARCHAR(36),

    IN subject VARCHAR(255),
    IN description TEXT
)
BEGIN
    INSERT INTO complaint_log (complaint_id, update_by, update_at, subject, description)
    VALUES (
        complaint_id,
        user_id,
        CURRENT_TIMESTAMP,
        subject,
        description
    );

END //

DELIMITER ;

-- Update Complaint Status ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE UpdateComplaintStatus (
    IN complaint_id VARCHAR(36),
    IN user_id VARCHAR(36),

    IN status VARCHAR(50),
    IN subject VARCHAR(255),
    IN description TEXT
)
BEGIN
    IF EXISTS(SELECT * FROM complaints c WHERE c.complaint_id = complaint_id AND c.status = status LIMIT 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Status is already set';
    ELSE
    	CALL UpdateComplaintLog(complaint_id, user_id, subject, description);
        UPDATE complaints c SET status = status WHERE c.complaint_id = complaint_id;
    END IF;
END //

DELIMITER ;


-- ---------------------------------------------------------------------------------------------------------------------
--                                     _  _  ____  ____  _    _  ___
--                                    ( \/ )(_  _)( ___)( \/\/ )/ __)
--                                     \  /  _)(_  )__)  )    ( \__ \
--                                      \/  (____)(____)(__/\__)(___/
-- ---------------------------------------------------------------------------------------------------------------------

CREATE VIEW accounts AS
    SELECT  u.*, c.username, c.hash, c.verified
    FROM users u
    LEFT JOIN credentials c ON c.user_id = u.user_id;

CREATE VIEW complaints_with_divisions AS
    SELECT c.*, ca.assigned_div, ca.assigned_date
    FROM complaints c
    LEFT JOIN complaint_assignment ca ON ca.complaint_id = c.complaint_id;

CREATE VIEW complaint_full_details AS
    SELECT
    	c.*,
    	ca.assigned_div,
    	ca.assigned_date,
    	GetLogsAsArray(c.complaint_id) AS logs,
    	GetAttachmentsAsArray(c.complaint_id) AS attachments
    FROM complaints c
    LEFT JOIN complaint_assignment ca ON ca.complaint_id = c.complaint_id;

-- ---------------------------------------------------------------------------------------------------------------------