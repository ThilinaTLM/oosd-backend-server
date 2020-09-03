
-- recreate database cms
DROP SCHEMA IF EXISTS `cms` ;
CREATE SCHEMA IF NOT EXISTS `cms` ;
USE `cms` ;

--  _______    _     _
-- |__   __|  | |   | |
--    | | __ _| |__ | | ___  ___
--    | |/ _` | '_ \| |/ _ \/ __|
--    | | (_| | |_) | |  __/\__ \
--    |_|\__,_|_.__/|_|\___||___/

-- Divisional Offices --------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`divisional_offices` ;

CREATE TABLE IF NOT EXISTS `cms`.`divisional_offices` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `cms`.`divisional_offices` (`name` ASC );

-- Grama Niladhari Offices ---------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`grama_niladhari_offices` ;

CREATE TABLE IF NOT EXISTS `cms`.`grama_niladhari_offices` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `name_UNIQUE` ON `cms`.`grama_niladhari_offices` (`name` ASC );

-- Customers -----------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`customers` ;

CREATE TABLE IF NOT EXISTS `cms`.`customers` (
    `id` VARCHAR(36) NOT NULL,
    `full_name` TEXT NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NULL,
    `telephone` VARCHAR(12) NULL,
    `address` TEXT NULL,
    `divisional_office_id` VARCHAR(36),
    `gn_office_id` VARCHAR(36),
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_div_office_id`
        FOREIGN KEY (`divisional_office_id`)
        REFERENCES `cms`.`divisional_offices` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_gn_office_id`
    FOREIGN KEY (`gn_office_id`)
        REFERENCES `cms`.`grama_niladhari_offices` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `nic_UNIQUE` ON `cms`.`customers` (`nic` ASC);
CREATE INDEX `fk_divisional_office_id_idx` ON `cms`.`customers` (`divisional_office_id` ASC);
CREATE INDEX `fk_gn_office_id_idx` ON `cms`.`customers` (`gn_office_id` ASC);

-- users ---------------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`users` ;

CREATE TABLE IF NOT EXISTS `cms`.`users` (
  `id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telephone` VARCHAR(12) NULL,
  `role` VARCHAR(20) NOT NULL,
  `office_id` VARCHAR(36),
  
  PRIMARY KEY (`id`),
 
  CONSTRAINT `fk_office_id`
    FOREIGN KEY (`office_id`)
    REFERENCES `cms`.`divisional_offices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE INDEX `fk_office_id_idx` ON `cms`.`users` (`office_id` ASC);

-- authentications -----------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`authentications` ;

CREATE TABLE IF NOT EXISTS `cms`.`authentications` (
    `user_id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(100) NULL,
    `hash` VARCHAR(60) NULL,
    `disabled` TINYINT NOT NULL DEFAULT 1,
    `p_code` INT UNSIGNED NOT NULL, -- permission code
    
    PRIMARY KEY (`user_id`),
    
    CONSTRAINT `fk_auth_user_id`
    	FOREIGN KEY (`user_id`)
    	REFERENCES `cms`.`users` (id)
    	ON DELETE NO ACTION
    	ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `cms`.`authentications` (`username` ASC);

-- complaint states ----------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS cms.complaint_states;

CREATE TABLE cms.complaint_states (
	state VARCHAR(50),
	description VARCHAR(255),
	
	PRIMARY KEY(state)
) ENGINE = InnoDB;

-- complaints ----------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`complaints` ;

CREATE TABLE IF NOT EXISTS `cms`.`complaints` (
    `id` VARCHAR(36) NOT NULL,
    `ref_no` VARCHAR(50),
    `type` VARCHAR(100) NOT NULL,

    `customer` VARCHAR(36),
    `subject` VARCHAR(200) NOT NULL,
    `description` TEXT,
    `status` VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),

    `assigned_div` VARCHAR(36),
    `assigned_by` VARCHAR(36),
    `assigned_date` TIMESTAMP NULL,

    PRIMARY KEY (`id`),

    CONSTRAINT `fk_assign_div`
        FOREIGN KEY (`assigned_div`)
        REFERENCES `cms`.`divisional_offices` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT `fk_assigned_by`
        FOREIGN KEY (`assigned_by`)
        REFERENCES `cms`.`users` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT `fk_customer`
        FOREIGN KEY (`customer`)
        REFERENCES `cms`.`customers` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	
    CONSTRAINT fk_status
    	FOREIGN KEY (status)
    	REFERENCES cms.complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX `fk_submit_by_idx` ON `cms`.`complaints` (`assigned_by` ASC);
CREATE INDEX `fk_customer_idx` ON `cms`.`complaints` (`customer` ASC);
CREATE INDEX `fk_assign_to_idx` ON `cms`.`complaints` (`assigned_div` ASC);
CREATE INDEX `fk_status_x` ON `cms`.`complaints` (`status` ASC);

-- attachments ---------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`attachments`;

CREATE TABLE `cms`.`attachments` (
    id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    format VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `url_UNIQUE` ON `cms`.`attachments` (`url` ASC );

-- complaint log -------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`complaint_log`;

CREATE TABLE `cms`.`complaint_log` (
    id INT UNSIGNED AUTO_INCREMENT,
    complaint_id VARCHAR(36) NOT NULL,
    update_by VARCHAR(36), -- user id
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_state VARCHAR(50), 
    next_state VARCHAR(50),
    note TEXT,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_pre_state
    	FOREIGN KEY (previous_state)
    	REFERENCES cms.complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
        
    CONSTRAINT fk_next_state
    	FOREIGN KEY (next_state)
    	REFERENCES cms.complaint_states (state)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;
    
-- notifications -------------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `cms`.`notifications`;

CREATE TABLE `cms`.`notifications` (
    id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL, -- need to add notification types
    read_time TIMESTAMP,
    title VARCHAR(255),
    message TEXT,
    
    PRIMARY KEY(id),

    CONSTRAINT `fk_notification_user_id`
        FOREIGN KEY (`user_id`)
        REFERENCES `cms`.`users` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX `fk_notification_user_idx` ON `cms`.`notifications` (`user_id` ASC);