const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8060;
const buzzArr = [];

app.use(express.static('./public'));
app.use( bodyParser.urlencoded( {extended: true})); //encodes the req

app.get('/buzzwords', (req, res) => {
  if(buzzArr.length > 0) {
    let allBuzzWords = {}
    //Make an object with just the buzzWords
    allBuzzWords['buzzWord'] = buzzArr.map((element) =>{ return element['buzzWord']});

    res.json(allBuzzWords);
  } else {
    res.status(400).send('No buzzWords. Add some in with POST');
  }
})

app.post('/buzzwords', (req, res) => {
  if(buzzArr.length <= 5) {
    buzzArr.push(req.body);
    res.send('Your data has been created!');
  } else {
    res.status(400).send('POST error! Reached max buzzwords length');
  }

  console.log(buzzArr);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});