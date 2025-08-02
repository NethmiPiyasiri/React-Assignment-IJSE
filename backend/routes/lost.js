const express = require("express");
const db = require("../db/db");
const moment = require("moment-timezone");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create new lost item
router.post("/", authenticateJWT, (req, res) => {
  const {
    title,
    description,
    is_marked_as_found,
    hand_over_place,
    found_remark,
    receivers_name,
    nic,
    receive_remark,
  } = req.body;

  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  const sql = `
    INSERT INTO lost (title, description, is_marked_as_found, hand_over_place, found_remark, receivers_name, nic, receive_remark, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      is_marked_as_found || 0,
      hand_over_place,
      found_remark,
      receivers_name,
      nic,
      receive_remark,
      sriLankaTime,
      sriLankaTime,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Insert failed" });
      res.json({ message: "Lost item added", id: result.insertId });
    }
  );
});

// Get all lost items
router.get("/", authenticateJWT, (req, res) => {
  db.query("SELECT * FROM lost WHERE deleted_at IS NULL", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Get all lost items 0
router.get("/lost", authenticateJWT, (req, res) => {
  db.query(
    "SELECT * FROM lost WHERE deleted_at IS NULL and is_marked_as_found = 0",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// Get all lost items 1
router.get("/found", authenticateJWT, (req, res) => {
  db.query(
    "SELECT * FROM lost WHERE deleted_at IS NULL and is_marked_as_found = 1",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// Get a single lost item by ID
router.get("/:id", authenticateJWT, (req, res) => {
  db.query(
    "SELECT * FROM lost WHERE id = ? AND deleted_at IS NULL",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ message: "Not found" });
      res.json(results[0]);
    }
  );
});

// Update lost item
router.put("/:id", authenticateJWT, (req, res) => {
  const {
    title,
    description,
    is_marked_as_found,
    hand_over_place,
    found_remark,
    receivers_name,
    nic,
    receive_remark,
  } = req.body;

  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  const fields = [];
  const values = [];

  if (title) fields.push("title = ?"), values.push(title);
  if (description) fields.push("description = ?"), values.push(description);
  if (is_marked_as_found !== undefined)
    fields.push("is_marked_as_found = ?"), values.push(is_marked_as_found);
  if (hand_over_place)
    fields.push("hand_over_place = ?"), values.push(hand_over_place);
  if (found_remark) fields.push("found_remark = ?"), values.push(found_remark);
  if (receivers_name)
    fields.push("receivers_name = ?"), values.push(receivers_name);
  if (nic) fields.push("nic = ?"), values.push(nic);
  if (receive_remark)
    fields.push("receive_remark = ?"), values.push(receive_remark);

  if (fields.length === 0)
    return res.status(400).json({ error: "No fields provided for update" });

  fields.push("updated_at = ?"), values.push(sriLankaTime);
  values.push(req.params.id);

  const sql = `UPDATE lost SET ${fields.join(
    ", "
  )} WHERE id = ? AND deleted_at IS NULL`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Lost item updated successfully" });
  });
});

// Soft delete lost item
router.delete("/:id", authenticateJWT, (req, res) => {
  const sriLankaTime = moment()
    .tz("Asia/Colombo")
    .format("YYYY-MM-DD HH:mm:ss");

  db.query(
    "UPDATE lost SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL",
    [sriLankaTime, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Delete failed" });
      res.json({ message: "Lost item deleted successfully" });
    }
  );
});

module.exports = router;
