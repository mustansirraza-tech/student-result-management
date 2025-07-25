const express = require('express');
const cors = require('cors');
const resultRoutes = require('./routes/resultRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/results', resultRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
