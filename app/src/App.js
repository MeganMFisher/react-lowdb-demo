import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getProducts, getProduct, removeProduct, addProduct, updateProduct } from './service';

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
    getProducts().then(products => {
      this.setState({
        // products: [...this.state.products, res]
        products: products
      })
    })
}

getProduct(id) {
  getProduct(id).then(product => {
    this.setState({
      product: product
    })
  })
}

removeProduct(id) {
  removeProduct(id).then(() => {
    getProducts().then(products => {
      this.setState({
        products: products
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
  var obj = {
    item: this.state.newProduct,
    id: this.state.products.length + 1
  }
  if(obj.item) {
  addProduct(obj).then(() => {
    getProducts().then(products => {
      this.setState({
        products: products
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
  updateProduct(obj).then(() => {
    getProducts().then(products => {
      this.setState({
        products: products
      })
    })
    this.setState({
    editProduct: ''
  })
  })
}


  render() {
        const products = this.state.products.map((product, i) => (
          <div key={i} className='productsContainer'>
            <ul className='products'>
                { !this.state.editInput ? <h3 onClick={() => this.getProduct(product.id)}> { product.item } </h3> : null }
                { this.state.editInput ? <div> <input onChange={ this.editProduct }/> <button onClick={() => this.sendEditProduct(product.id)}>Change</button> </div>: null }
                <button onClick={ this.editClick }>Edit</button>
                <button onClick={() => this.removeProduct(product.id)}>Delete</button>
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
        <button onClick={ this.sendProduct }>Send</button>
          { products }
           <h1>{ this.state.product.item }
          </h1> 
      </div>
    );
  }
}

export default App;
