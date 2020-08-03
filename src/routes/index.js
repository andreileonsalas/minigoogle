const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const word = {};
  res.render('index', { word: word });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Page' });
});

router.post('/', async (req, res) => {
  const body = req.body;
  //console.log(body.word);
  //var strBody = JSON.stringify(body);
  //res.redirect('/search/' + strBody);

  var word = body.word;
  res.redirect('/search/' + word);
});

module.exports = router;
