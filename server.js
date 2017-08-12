const express = require('express')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

// Create server
const app = express()

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low('db.json', {
  storage: fileAsync
})


// Routes
// GET /products
app.get('/allProducts', (req, res) => {
  const allProducts = db.get('allProducts')
    .value()
    console.log(allProducts)
  res.send(allProducts)
})


// GET /product/:id
app.get('/product/:id', (req, res) => {
  const product = db.get('allProducts')
    .find({ id: Number(req.params.id) })
    .value()
  res.send(product)
})


// POST /posts
app.post('/allProducts', (req, res) => {
    console.log(req.body)
  const added = db.get('allProducts')
    .push(req.body)
    .last()
    .assign({ id: 4 })
    .write()
    .then(post => res.send(post))
})



// Init
// db.defaults({ allProducts: [{item: 'Sweater', id: 1}, {item: 'Jelly Shoes', id: 2 }, {item: 'WindBreaker', id: 3}] })
//   .write()
//   .then(() => {
    app.listen(4004, () => console.log('Server is listening'))
// })
