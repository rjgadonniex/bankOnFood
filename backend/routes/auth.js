const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const [result] = await req.pool.execute(
      'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'Customer']
    );
    res.status(201).json({ 
      message: "✅ User created successfully in MySQL!", 
      userId: result.insertId 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;