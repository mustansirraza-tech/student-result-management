const express = require('express');
const router = express.Router();
const fetchSheetData = require('../utils/fetchSheet');

router.post('/verify', async (req, res) => {
  const { ticketNo, name } = req.body;

  try {
    const sheetData = await fetchSheetData();

    const result = sheetData.find((r) =>
      r['Hall Ticket']?.toString().trim().toLowerCase() === ticketNo.toString().trim().toLowerCase() &&
      r['Name']?.toString().trim().toLowerCase() === name.toString().trim().toLowerCase()
    );

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
