
-- Clean and create database cms -----------------------------------------------------------------------------------------------
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- ---------------------------------------------------------------------------------------------------------------------
--  _______    _     _
-- |__   __|  | |   | |
--    | | __ _| |__ | | ___  ___
--    | |/ _` | '_ \| |/ _ \/ __|
--    | | (_| | |_) | |  __/\__ \
--    |_|\__,_|_.__/|_|\___||___/

-- Divisional Offices --------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS divisional_offices (
    name VARCHAR(100) NOT NULL,
    address TEXT,
    PRIMARY KEY (name),
    UNIQUE(name)
);

-- Grama Niladhari Offices ---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS grama_niladhari_offices (
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (name),
    UNIQUE(name)
);

-- Customers -----------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    customer_id VARCHAR(36) NOT NULL,
    full_name TEXT NOT NULL,
    nic VARCHAR(20) NOT NULL,
    email VARCHAR(100) NULL,
    telephone VARCHAR(12) NULL,
    address TEXT NULL,

    divisional_office VARCHAR(100),
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
);

CREATE UNIQUE INDEX nic_UNIQUE ON customers (nic ASC);
CREATE INDEX fk_divisional_office_x ON customers (divisional_office ASC);
CREATE INDEX fk_gn_office_x ON customers (gn_office ASC);

-- users roles ---------------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_roles (
  role VARCHAR(100) NOT NULL,
  description VARCHAR(255),

  PRIMARY KEY (role)
);

-- users ---------------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(36) NOT NULL,
  username VARCHAR(100) NOT NULL,
  hash VARCHAR(60) NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
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
);

CREATE INDEX fk_office_x ON users (office ASC);

-- complaint types ----------------------------------------------------------------------------------------------------
CREATE TABLE complaint_types (
	type VARCHAR(50),
	description VARCHAR(255),

	PRIMARY KEY(type)
);

-- complaint states ----------------------------------------------------------------------------------------------------
CREATE TABLE complaint_states (
	state VARCHAR(50),
	description VARCHAR(255),
	
	PRIMARY KEY(state)
);

-- complaints ----------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(36) NOT NULL,
    ref_no VARCHAR(50),
    type VARCHAR(50) NOT NULL,

    customer_id VARCHAR(36),
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,

    assigned_div VARCHAR(100),
    assigned_by VARCHAR(36),
    assigned_date TIMESTAMP NULL,

    PRIMARY KEY (id),

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
);

CREATE INDEX fk_submit_by_idx ON complaints (assigned_by ASC);
CREATE INDEX fk_customer_idx ON complaints (customer_id ASC);
CREATE INDEX fk_assign_to_idx ON complaints (assigned_div ASC);
CREATE INDEX fk_status_x ON complaint_states ( state ASC);

-- attachments ---------------------------------------------------------------------------------------------------------
CREATE TABLE attachments (
    id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    format VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX url_UNIQUE ON attachments (url ASC );

-- complaint log -------------------------------------------------------------------------------------------------------
CREATE TABLE complaint_log (
    id VARCHAR(36),
    complaint_id VARCHAR(36) NOT NULL,
    update_by VARCHAR(36), -- user id
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_state VARCHAR(50), 
    next_state VARCHAR(50),
    note TEXT,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_pre_state
    	FOREIGN KEY (previous_state)
    	REFERENCES complaint_states(state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
        
    CONSTRAINT fk_next_state
    	FOREIGN KEY (next_state)
    	REFERENCES complaint_states(state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
    
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
);

CREATE INDEX fk_notification_user_idx ON notifications (user_id ASC);