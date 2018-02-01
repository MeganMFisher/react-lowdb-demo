import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
constructor() {
  super()

  this.state = {
    products: [],
    product: '',
    newProduct: '',
    editInput: false,
    editProduct: ''
  }

  this.getProduct = this.getProduct.bind(this)
  this.addProduct = this.addProduct.bind(this)
  this.sendProduct = this.sendProduct.bind(this)
  this.editClick = this.editClick.bind(this)
  this.editProduct = this.editProduct.bind(this)
}

componentDidMount() {
  axios.get('http://localhost:4004/products').then(products => {
      this.setState({
        // products: [...this.state.products, res]
        products: products.data
      })
      console.log(this.state.products)
    })
}

getProduct(id) {
  axios.get('http://localhost:4004/product/' + id).then(product => {
    this.setState({
      product: product.data
    })
  })
}

removeProduct(id) {
  axios.delete('http://localhost:4004/product/' + id).then(() => {
    axios.get('http://localhost:4004/products').then(products => {
      this.setState({
        products: products.data
      })
    })
  })
}

addProduct(e) {
    this.setState({
      newProduct: e.target.value
    })
}

sendProduct() {
  var list = this.state.products
  var num = [];
  list.map(e => num.push(e.id))
  var highest = Math.max.apply(null, num)

  var obj = {
    item: this.state.newProduct,
    id: highest + 1
  }
  if(obj.item) {
    axios.post('http://localhost:4004/products', obj).then(() => {
      axios.get('http://localhost:4004/Products').then(products => {
        console.log(products)
      this.setState({
        products: products.data
      })
    })
  })
  this.setState({
    newProduct: ''
  })
  }
}

editClick() {
  
  if(this.state.editInput) {
    this.setState({
    editInput: false
  })
  } else {
    this.setState({
    editInput: true
  })
  }
}

editProduct(e) {
    this.setState({
      editProduct: e.target.value
    })
}

sendEditProduct(e) {
  var obj = {
    item: this.state.editProduct,
    id: e
  }
console.log(obj)
axios.put('http://localhost:4004/updateProduct', obj).then(() => {
    axios.get('http://localhost:4004/products').then(products => {
      this.setState({
        products: products.data
      })
    })
    this.setState({
    editProduct: '',
    editInput: false
  })
  })
}


  render() {
        const products = this.state.products.map((product, i) => (
          <div key={i} className='productsContainer'>
            <ul className='products'>
                { !this.state.editInput ? <h3 onClick={() => this.getProduct(product.id)}> { product.item } </h3> : null }
                { this.state.editInput ? <div> <input onChange={ this.editProduct }/> <button onClick={() => this.sendEditProduct(product.id)}>Change</button> </div>: null }
                <div className='buttonContainer'>
                <button onClick={ this.editClick }>Edit</button>
                <button onClick={() => this.removeProduct(product.id)}>Delete</button>
                </div>
            </ul>
          </div>
        ))
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React lowdb Demo</h2>
        </div>
        <input className='topInput' onChange={ this.addProduct } value={ this.state.newProduct }/>
        <button onClick={ this.sendProduct }>Add Product</button>
          { products }
           <h1>{ this.state.product.item }
          </h1> 
      </div>
    );
  }
}

export default App;
