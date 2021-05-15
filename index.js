const express = require('express');
// const { sort } = require('./Fruits');
// import { fruits } from './Fruits';

const fruits = require('./Fruits');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`up on port ${PORT}`))

app.get('/ping', (req, res) => {
	res.json('pong');
})

app.get('/greet/:name', (req, res) => {
  res.json(`Why hello there, ${req.params.name} !`);
  // console.log(JSON.stringify(req.params.name));
})

app.get('/five', (req, res) => {
  res.json([1, 2, 3, 4, 5]);
})

app.get('/evens/:n', (req, res) => {
  let num = parseInt(req.params.n);
  
  let arr = [];
  for (let i = 2; i <= num; i++){
    if (i % 2 === 0) {
      arr.push(i);
    }
  }
  res.json(arr);
})

app.get('/namelength/:name', (req, res) => {
  res.json(req.params.name.length);
})

app.get('/fruits', (req, res) => {
  res.send(fruits);
})

app.get('/fruits/sort', (req, res) => {
  // let sortedFruits = fruits.sort((a,b) => a.name.localeCompare(b.name));
  // res.send(sortedFruits);

  let fruitsCopy = [...fruits];
  let temp;

  for (let i = 0; i < fruitsCopy.length; i++){
    for (let j = 0; j < fruitsCopy.length - i - 1; j++)
      if (fruitsCopy[j].name.localeCompare(fruitsCopy[j + 1].name) === 1) {
        temp = fruitsCopy[j];
        fruitsCopy[j] = fruitsCopy[j + 1];
        fruitsCopy[j + 1] = temp;
      }
  }

  res.send(fruitsCopy);
})

app.get('/fruits/:name', (req, res) => {
  res.json(fruits.find(element => element.name.toLowerCase() === req.params.name.toLowerCase()));
})

app.use('*', (req, res) => {
  res.json('default endpoint');
})


