const express = require('express');
const app = express();

app.use(express.static('static_files'));

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});


app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});


const data = {
  a: 50,
  the: 100,
  hello: 5,
  thing: 20,
  game: 10
};

app.get('/exampleX', (req, res) => {
  const xData = Object.keys(data);
  console.log('x data is:', xData);
  res.send(xData);
});

app.get('/exampleY', (req, res) => {
  const yData = Object.values(data);
  console.log('y data is:', yData);
  res.send(yData);
});
