const express = require('express');
const app = express();
const port = 5000;

// Example route for testing
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
