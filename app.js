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
    allBuzzWords.buzzWord = buzzArr.map((element) =>{ return element.buzzWord});

    res.json(allBuzzWords);
  } else {
    res.status(400).send('No buzzWords. Add some in with POST');
  }
});

app.post('/buzzwords', (req, res) => {// Shouldn't allow you to post the same word
  if(buzzArr.length <= 5) {
    buzzArr.push(req.body);
    res.json({ "success": true });
  } else {
    res.status(400).json({ "success": false });
  }

  console.log(buzzArr);
});

app.put('/buzzwords', (req, res) => {
  let change = false; //Checks if I changed something

  buzzArr.forEach((element) => {
    if(element.buzzWord === req.body.buzzWord) {
      element.points = req.body.points;
      change = true;
    }
  });

  if(change) {
    res.json({ "success": true });
  } else {
    res.status(400).json({ "success": false });
  }
});

app.delete('/buzzwords', (req, res) => {
  let remove = false;

  buzzArr.forEach((element, index) => {
    if(element.buzzWord === req.body.buzzWord) {
      buzzArr.splice(index, 1);
      remove = true;
    }
  });

  if(remove) {
    res.json({ "success": true });
  } else {
    res.status(400).json({ "success": false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});