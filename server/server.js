const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const adapter = new FileSync('db.json')
const db = low(adapter)


// Create server
const app = express()
app.use('/', express.static('public'));   // serve static files

app.use(bodyParser.json()); // support json encoded bodies, needed por post x-www-form-urlencoded to work
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())


// Routes
// GET /allProducts
app.get('/Products', (req, res) => {
  const allProducts = db.get('Products')
    .value()
  res.send(allProducts)
})


// GET /product/:id
app.get('/product/:id', (req, res) => {
  const product = db.get('Products')
    .find({ id: Number(req.params.id) })
    .value()
  res.send(product)
})


// DELETE /product/:id
app.delete('/product/:id', (req, res) => {
    const productDeleted = db.get('Products')
    .remove({ id: Number(req.params.id) })
    .write()
    res.send(productDeleted)
})

// PUT /updateProduct
app.put('/updateProduct', (req, res) => {
    db.get('Products')
    .find({ id: Number(req.body.id) })
   .assign({item: req.body.item})
   .write()
   res.send('updated')
})


// POST /Products
app.post('/products', (req, res) => {
  db.get('Products').push({ id: req.body.id, item: req.body.item})
  .write()
  res.send('added')
})

// RESET DATABASE /reset
app.delete('/reset', (req, res) => {
    db.set('Products', [{item: 'Sweater', id: 1}, {item: 'Jelly Shoes', id: 2 }, {item: 'WindBreaker', id: 3}])
    .write()
})


// Init
// db.defaults({ Products: [{item: 'Sweater', id: 1}, {item: 'Jelly Shoes', id: 2 }, {item: 'WindBreaker', id: 3}] })
//   .write()
//   .then(() => {
    app.listen(4004, () => console.log('Server is listening'))
// })
