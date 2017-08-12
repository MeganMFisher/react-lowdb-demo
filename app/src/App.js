import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getProducts, getProduct, removeProduct } from './service';

class App extends Component {
constructor() {
  super()

  this.state = {
    products: [],
    product: ''
  }

  this.getProduct = this.getProduct.bind(this)
}

componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products: products
      })
      console.log(this.state.products)
    })
}

getProduct(id) {
  getProduct(id).then(product => {
    this.setState({
      product: product
    })
    console.log(this.state.product)
  })
}

removeProduct(id) {
  console.log(id)
  removeProduct(id).then(() => {
    getProducts()
  })
}



  render() {
        const products = this.state.products.map((product, i) => (
          <div key={i} className='productsContainer'>
            <ul className='products'>
                <h3 onClick={() => this.getProduct(product.id)}> { product.item } </h3>
                <div onClick={() => this.removeProduct(product.id)}>X</div>
            </ul>
          </div>
        ))
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React lowdb Demo</h2>
        </div>
           <input /> 

          { products }

           <h1>{ this.state.product.item }
          </h1> 
      </div>
    );
  }
}

export default App;
