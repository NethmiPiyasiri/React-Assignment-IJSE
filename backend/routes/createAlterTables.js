const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { createUserTable, createLostTable } = require("../tables/createTables");
const { updateUserTable, updateLostTable } = require("../tables/updateTables");

router.get("/create", async (req, res) => {
  try {
    await createUserTable();
    await createLostTable();
    res.json("Tables created successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/update", async (req, res) => {
  try {
    await updateUserTable();
    await updateLostTable();
    res.json("Tables updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
