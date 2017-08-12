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
// GET /allProducts
app.get('/allProducts', (req, res) => {
  const allProducts = db.get('allProducts')
    .value()
  res.send(allProducts)
})


// GET /product/:id
app.get('/product/:id', (req, res) => {
  const product = db.get('allProducts')
    .find({ id: Number(req.params.id) })
    .value()
  res.send(product)
})


// DELETE /product/:id
app.delete('/product/:id', (req, res) => {
    const productDeleted = db.get('allProducts')
    .remove({ id: Number(req.params.id) })
    .value()
    res.send(productDeleted)
})

// PUT

app.put('/updateProduct', (req, res) => {
    console.log(req.body)
    db.get('allProducts')
    .find({ id: 1 })
   .assign({item: "overalls"})
//     .find({ id: Number(req.body.id) })
//    .assign({item: req.body.item})
   .value();
})



// POST /allProducts
app.post('/allProducts', (req, res) => {
  const added = db.get('allProducts')
  .push({ id: 4, item: 'shirt'})
  .last()
  .write()
  .then(post => res.send(added))
})



// Init
// db.defaults({ allProducts: [{item: 'Sweater', id: 1}, {item: 'Jelly Shoes', id: 2 }, {item: 'WindBreaker', id: 3}] })
//   .write()
//   .then(() => {
    app.listen(4004, () => console.log('Server is listening'))
// })
