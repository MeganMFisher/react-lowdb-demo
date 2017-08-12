import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getProducts } from './service';

class App extends Component {
constructor() {
  super()

  this.state = {
    products: []
  }
}

componentDidMount() {
    getProducts().then(products => {
      this.setState({
        products: products
      })
      console.log(this.state.products)
    })
}


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React lowdb Demo</h2>
        </div>

      </div>
    );
  }
}

export default App;
