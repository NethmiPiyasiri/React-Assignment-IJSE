const db = require("../db/db");

const updateUserTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
        ALTER TABLE \`user\`
          MODIFY \`id\` INT(11) NOT NULL AUTO_INCREMENT,
          ADD PRIMARY KEY (\`id\`)
      `;

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("Modified user table...");
      resolve(result);
    });
  });
};

const updateLostTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `
        ALTER TABLE \`lost\`
          MODIFY \`id\` INT(11) NOT NULL AUTO_INCREMENT,
          ADD PRIMARY KEY (\`id\`)
      `;

    db.query(sql, (err, result) => {
      if (err) return reject(err);
      console.log("Modified lost table...");
      resolve(result);
    });
  });
};

module.exports = {
  updateUserTable,
  updateLostTable,
};