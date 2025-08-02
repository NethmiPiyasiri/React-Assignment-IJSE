const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const moment = require("moment-timezone");
const { authenticateJWT } = require("../middlewares/authMiddleware");
const { generateAccessToken } = require("../utils/token");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, first_name, last_name, email, mobile, birthday, password } =
    req.body;
  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const checkQuery =
      "SELECT id FROM user WHERE email = ? AND deleted_at IS NULL";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length > 0)
        return res.status(400).json({ error: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = `
        INSERT INTO user (username, first_name, last_name, email, mobile, birthday, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [
          username,
          first_name,
          last_name,
          email,
          mobile,
          birthday,
          hashedPassword,
          sriLankaTime,
          sriLankaTime,
        ],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Insert failed" });
          res.json({
            message: "User registered successfully",
            userId: result.insertId,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ? AND deleted_at IS NULL",
    [email],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      res.json({
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          mobile: user.mobile,
        },
      });
    }
  );
});

// Get all users
router.get("/", authenticateJWT, (req, res) => {
  db.query("SELECT * FROM user WHERE deleted_at IS NULL", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Get user by ID
router.get("/:id", authenticateJWT, (req, res) => {
  db.query(
    "SELECT * FROM user WHERE id = ? AND deleted_at IS NULL",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    }
  );
});

// Update user
router.put("/:id", authenticateJWT, async (req, res) => {
  const { username, first_name, last_name, email, mobile, birthday, password } =
    req.body;
  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  const fields = [];
  const values = [];

  if (username) fields.push("username = ?"), values.push(username);
  if (first_name) fields.push("first_name = ?"), values.push(first_name);
  if (last_name) fields.push("last_name = ?"), values.push(last_name);
  if (email) fields.push("email = ?"), values.push(email);
  if (mobile) fields.push("mobile = ?"), values.push(mobile);
  if (birthday) fields.push("birthday = ?"), values.push(birthday);
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    fields.push("password = ?"), values.push(hashed);
  }

  if (fields.length === 0)
    return res.status(400).json({ error: "No fields provided for update" });

  fields.push("updated_at = ?"),
    values.push(sriLankaTime),
    values.push(req.params.id);

  const sql = `UPDATE user SET ${fields.join(
    ", "
  )} WHERE id = ? AND deleted_at IS NULL`;
  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "User updated successfully" });
  });
});

// Soft Delete User
router.delete("/:id", authenticateJWT, (req, res) => {
  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  db.query(
    "UPDATE user SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL",
    [sriLankaTime, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Delete failed" });
      res.json({ message: "User deleted successfully" });
    }
  );
});

module.exports = router;
