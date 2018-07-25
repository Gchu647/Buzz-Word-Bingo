const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8060;

app.use(express.static('./public'));

app.post('/buzzwords', (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});