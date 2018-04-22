const express = require('express');
const app = express();

app.use(express.static('static_files'));

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});


app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});
