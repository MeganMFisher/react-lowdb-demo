const express = require('express')
const bodyParser = require('body-parser');
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

// Create server
const app = express()
app.use('/', express.static('public'));   // serve static files

app.use(bodyParser.json()); // support json encoded bodies, needed por post x-www-form-urlencoded to work
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    .write()
    res.send(productDeleted)
})

// PUT

app.put('/updateProduct', (req, res) => {
    db.get('allProducts')
    .find({ id: Number(req.body.id) })
   .assign({item: req.body.item})
   .write();
})

app.delete('/remove', (req, res) => {
    db.get('allProducts')
    .remove(null)
    .write()
})


// POST /allProducts
app.post('/allProducts', (req, res) => {
  const added = db.get('allProducts')
  .push({ id: req.body.id, item: req.body.item})
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
