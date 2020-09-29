
-- clean create database cms -------------------------------------------------------------------------------------------

--DROP SCHEMA IF EXISTS cms ;
--CREATE SCHEMA IF NOT EXISTS cms ;
--USE cms;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS complaint_log;
DROP TABLE IF EXISTS complaint_attachment;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS complaints ;
DROP TABLE IF EXISTS complaint_types;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS user_roles ;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS grama_niladhari_offices;
DROP TABLE IF EXISTS divisional_offices;

DROP PROCEDURE IF EXISTS AddAccount;
DROP PROCEDURE IF EXISTS UpdateComplaint ;

-- ---------------------------------------------------------------------------------------------------------------------
--  _______    _     _
-- |__   __|  | |   | |
--    | | __ _| |__ | | ___  ___
--    | |/ _` | '_ \| |/ _ \/ __|
--    | | (_| | |_) | |  __/\__ \
--    |_|\__,_|_.__/|_|\___||___/
-- ---------------------------------------------------------------------------------------------------------------------

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

-- users roles ---------------------------------------------------------------------------------------------------------

CREATE TABLE user_roles (
  role VARCHAR(100) NOT NULL,
  description VARCHAR(255),

  PRIMARY KEY (role)
)
ENGINE = InnoDB;

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

-- complaint types -----------------------------------------------------------------------------------------------------

CREATE TABLE complaint_types (
	type VARCHAR(50),
	description VARCHAR(255),

	PRIMARY KEY(type)
) ENGINE = InnoDB;

-- complaint states ----------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS complaint_states;

CREATE TABLE complaint_states (
	state VARCHAR(50),
	description VARCHAR(255),
	
	PRIMARY KEY(state)
) ENGINE = InnoDB;

-- complaints ----------------------------------------------------------------------------------------------------------

CREATE TABLE complaints (
    complaint_id VARCHAR(36) NOT NULL,
    ref_no VARCHAR(50),
    type VARCHAR(50) NOT NULL,

    customer_id VARCHAR(36),
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),

    assigned_div VARCHAR(100),
    assigned_by VARCHAR(36),
    assigned_date TIMESTAMP NULL,

    PRIMARY KEY (complaint_id),

    CONSTRAINT fk_assigned_div
        FOREIGN KEY (assigned_div)
        REFERENCES divisional_offices (name)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT fk_assigned_by
        FOREIGN KEY (assigned_by)
        REFERENCES users (user_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

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

CREATE INDEX fk_submit_by_idx ON complaints (assigned_by ASC);
CREATE INDEX fk_customer_idx ON complaints (customer_id ASC);
CREATE INDEX fk_assign_to_idx ON complaints (assigned_div ASC);
CREATE INDEX fk_status_x ON complaint_states ( state ASC);

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
                FOREIGN KEY (complaint_id)
                REFERENCES attachments(attachment_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- complaint log -------------------------------------------------------------------------------------------------------

CREATE TABLE complaint_log (
    id INT UNSIGNED AUTO_INCREMENT,
    complaint_id VARCHAR(36) NOT NULL,
    update_by VARCHAR(36), -- user id
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_state VARCHAR(50), 
    next_state VARCHAR(50),
    subject VARCHAR(255),
    description TEXT,
    
    PRIMARY KEY(id),

    CONSTRAINT fk_log_complaint_id
        FOREIGN KEY (complaint_id)
        REFERENCES complaints (complaint_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    
    CONSTRAINT fk_pre_state
    	FOREIGN KEY (previous_state)
    	REFERENCES complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
        
    CONSTRAINT fk_next_state
    	FOREIGN KEY (next_state)
    	REFERENCES complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;
    
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
--  _____                        _
-- |  __ \                      | |
-- | |__) | __ ___   ___ ___  __| |_   _ _ __ ___  ___
-- |  ___/ '__/ _ \ / __/ _ \/ _` | | | | '__/ _ \/ __|
-- | |   | | | (_) | (_|  __/ (_| | |_| | | |  __/\__ \
-- |_|   |_|  \___/ \___\___|\__,_|\__,_|_|  \___||___/
--
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

-- Update Complaint Status ---------------------------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE UpdateComplaint (
    IN complaint_id VARCHAR(36),
    IN user_id VARCHAR(36),

    IN status VARCHAR(50),
    IN subject VARCHAR(255),
    IN description VARCHAR(100)
)
BEGIN
    DECLARE previous_state VARCHAR(50);
    SELECT status INTO previous_state FROM complaints WHERE complaint_id = complaint_id;

    INSERT INTO complaint_log VALUES (
        complaint_id,
        user_id,
        CURRENT_TIMESTAMP,
        previous_state,
        status,
        subject,
        description
    );

    UPDATE complaints SET status = status WHERE complaint_id = complaint_id;

END //

DELIMITER ;

