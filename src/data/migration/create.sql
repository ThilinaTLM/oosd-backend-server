-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cms
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cms` ;

-- -----------------------------------------------------
-- Schema cms
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cms` ;
USE `cms` ;

-- -----------------------------------------------------
-- Table `cms`.`divisional_offices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`divisional_offices` ;

CREATE TABLE IF NOT EXISTS `cms`.`divisional_offices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `division_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `division_name_UNIQUE` ON `cms`.`divisional_offices` (`division_name` ASC);


-- -----------------------------------------------------
-- Table `cms`.`grama_niladhari_offices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`grama_niladhari_offices` ;

CREATE TABLE IF NOT EXISTS `cms`.`grama_niladhari_offices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `gn_division_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cms`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`customers` ;

CREATE TABLE IF NOT EXISTS `cms`.`customers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` TEXT NOT NULL,
  `nic` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NULL,
  `telephone` VARCHAR(12) NULL,
  `address` TEXT NULL,
  `divisional_office_id` INT UNSIGNED NOT NULL,
  `gn_office_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_divisional_office_id`
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


-- -----------------------------------------------------
-- Table `cms`.`authentications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`authentications` ;

CREATE TABLE IF NOT EXISTS `cms`.`authentications` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `hash` VARCHAR(60) NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `permission_code` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `cms`.`authentications` (`username` ASC);


-- -----------------------------------------------------
-- Table `cms`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`users` ;

CREATE TABLE IF NOT EXISTS `cms`.`users` (
  `id` INT UNSIGNED NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telephone` VARCHAR(12) NULL,
  `role` ENUM('0', '1', '2', '3') NOT NULL,
  `office_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`id`)
    REFERENCES `cms`.`authentications` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_office_id`
    FOREIGN KEY (`office_id`)
    REFERENCES `cms`.`divisional_offices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_office_id_idx` ON `cms`.`users` (`office_id` ASC);


-- -----------------------------------------------------
-- Table `cms`.`complaints`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cms`.`complaints` ;

CREATE TABLE IF NOT EXISTS `cms`.`complaints` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_number` INT UNSIGNED NOT NULL,
  `origin` VARCHAR(100) NOT NULL,
  `assign_to` INT UNSIGNED NOT NULL,
  `submit_by` INT UNSIGNED NULL,
  `customer` INT UNSIGNED NULL,
  `subject` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `attachments` VARCHAR(45) NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `assigned_date` TIMESTAMP NULL,
  `current_state` INT NOT NULL,
  `log` JSON NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_assign_to`
    FOREIGN KEY (`assign_to`)
    REFERENCES `cms`.`divisional_offices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_submit_by`
    FOREIGN KEY (`submit_by`)
    REFERENCES `cms`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer`
    FOREIGN KEY (`customer`)
    REFERENCES `cms`.`customers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_submit_by_idx` ON `cms`.`complaints` (`submit_by` ASC);

CREATE INDEX `fk_customer_idx` ON `cms`.`complaints` (`customer` ASC);

CREATE INDEX `fk_assign_to_idx` ON `cms`.`complaints` (`assign_to` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
