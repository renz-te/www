CREATE DATABASE IF NOT EXISTS resolveed CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE resolveed;
CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(150) NOT NULL,
 username VARCHAR(80) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 role ENUM('student','staff','admin') NOT NULL DEFAULT 'student',
 security_question VARCHAR(150) NULL,
 security_answer VARCHAR(255) NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS reports (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(180) NOT NULL,
 description TEXT NOT NULL,
 category VARCHAR(80) NOT NULL,
 priority ENUM('low','medium','high','critical') NOT NULL DEFAULT 'medium',
 location VARCHAR(180) NULL,
 evidence VARCHAR(255) NULL,
 status ENUM('pending','under_review','in_progress','resolved','rejected') NOT NULL DEFAULT 'pending',
 reported_by INT NOT NULL,
 assigned_to INT NULL,
 action_taken TEXT NULL,
 resolution_date DATETIME NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_reporter FOREIGN KEY(reported_by) REFERENCES users(id) ON DELETE CASCADE,
 CONSTRAINT fk_assignee FOREIGN KEY(assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
INSERT INTO users(full_name,username,password,role) VALUES
('System Administrator','admin','$2y$12$HWl4XWv7tvynimbVpRY2U.IPiC1LS88tL4Wb1.ffCTvfiif1MJDnK','admin'),
('School Staff','staff','$2y$12$HWl4XWv7tvynimbVpRY2U.IPiC1LS88tL4Wb1.ffCTvfiif1MJDnK','staff')
ON DUPLICATE KEY UPDATE username=username;
