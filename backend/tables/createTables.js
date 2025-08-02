const db = require("../db/db");

const createUserTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
          \`id\` INT(11) NOT NULL,
          \`username\` VARCHAR(100) NOT NULL UNIQUE,
          \`first_name\` VARCHAR(100) NOT NULL,
          \`last_name\` VARCHAR(100) NOT NULL,
          \`email\` VARCHAR(255) NOT NULL UNIQUE,
          \`mobile\` VARCHAR(20) NULL,
          \`birthday\` DATE NULL,
          \`password\` VARCHAR(255) NOT NULL,
          \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
          \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          \`deleted_at\` TIMESTAMP NULL DEFAULT NULL
      )
    `;
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("User table (updated) created");
      resolve(result);
    });
  });
};


const createLostTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS lost (
        \`id\` INT(11) NOT NULL,
        \`title\` VARCHAR(255) NOT NULL,
        \`description\` TEXT NULL,
        \`is_marked_as_found\` TINYINT DEFAULT 0,
        \`hand_over_place\` TEXT NULL,
        \`found_remark\` TEXT NULL,
        \`receivers_name\` VARCHAR(255) NULL,
        \`nic\` VARCHAR(255) NULL,
        \`receive_remark\` TEXT NULL,
        \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`deleted_at\` TIMESTAMP NULL DEFAULT NULL
      )
    `;
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("Lost table created");
      resolve(result);
    });
  });
};

module.exports = {
  createUserTable,
  createLostTable,
};