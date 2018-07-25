const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8060;
const buzzWordArr = [];

app.use(express.static('./public'));
app.use( bodyParser.urlencoded( {extended: true})); //encodes the req

app.post('/buzzwords', (req, res) => {
  if(buzzWordArr.length <= 5) {
    buzzWordArr.push(req.body);
    res.send('Your data has been created!');
  } else {
    res.status(400).send('POST error! Reached max buzzwords length');
  }

  console.log(buzzWordArr);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});