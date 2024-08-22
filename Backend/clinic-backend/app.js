const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS with various options
// For unrestricted access, use:
app.use(cors());

// For restricted access, use:
// app.use(cors({ origin: 'http://example.com' }));

app.get('/', (req, res) => {
  res.send('Clinic Backend is rudnning');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});