const axios = require('axios');

const SHEET_ID = '1T-YXZKonE01BeEXSUYZ6kCqBam8q5dr9UxWGXHo4ndM'; // Aapka Sheet ID
const SHEET_NAME = 'Sheet1'; // Sheet ka naam
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

const fetchSheetData = async () => {
  const response = await axios.get(SHEET_URL);
  const rawData = response.data;

  // Clean JSON
  const jsonData = JSON.parse(rawData.substring(47).slice(0, -2));
  const cols = jsonData.table.cols.map(c => c.label);
  const rows = jsonData.table.rows;

  const data = rows.map((row) => {
    const rowData = {};
    row.c.forEach((cell, i) => {
      rowData[cols[i]] = cell?.v ?? '';
    });
    return rowData;
  });

  return data;
};

module.exports = fetchSheetData;
