import React from 'react';
import Products from './Components/products';
import Filter from './Components/filter';
import Basket from './Components/basket';
import './App.css';


class App extends React.Component {

  state = {
    products: [],
    filterProducts: [],
    cardItems: [],
    size: '',
    sort: ''
  }

  componentDidMount() {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data, filterProducts: data });
      });
  }
  handleAddToCard = (e, product) => {
    e.preventDefault();
    this.setState(state => {
      const cardItems = state.cardItems;
      let productAlreadyInCard = false;

      cardItems.forEach(item => {
        if(item.id === product.id) {
          cardItems.count += 1;
          productAlreadyInCard = true;
        }
      });

      if (!productAlreadyInCard) {
        cardItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cardItems", JSON.stringify(cardItems));
      return { cardItems: cardItems };
    });
  };
  handleChangeSort = (e) => {
    this.setState({sort: e.target.value});
    this.listProductsSort()
  }
  handleChangeSize = (e) => {
    this.setState({size: e.target.value});
    this.listProductsSort()
  }
  listProductsSort = () => {
    if(this.state.sort === '') {
      this.state.products.sort((a,b) => this.state.sort === 'lowest' // The Condition
      ?(a.price < b.price)?1:-1 // If True Return this Sort
      :(a.price > b.price)?1:-1 ) // Else Return this Sort
    } else {
      this.state.products.sort((a,b) => (a.id < b.id)?1:-1)
    }
    if(this.state.size !== '') {
      return{
        filterProducts: this.state.products
        .filter( a => a.availableSizes.indexOf(this.state.size.toUpperCase())>=0)
      }
    }
    return {filterProducts: this.state.products}
  }
  render () {
      return (
        <div className="App">
          <div className='container'>
            <h1>E-Commerce Shopping Card</h1>
            <hr/>
            <div className='row'>
              <div className='col-md-8'>
                <Filter
                size={this.state.size} 
                sort={this.state.sort}
                handleChangeSize={this.handleChangeSize}
                handleChangeSort={this.handleChangeSort}
                count={this.state.filterProducts.length} />
                <hr/>
                <Products
                products={this.state.filterProducts}
                handleAddToCard={this.handleAddToCard} />
              </div>
              <div className='col-md-4'>
                <Basket
                cardItems={this.state.cardItems}
                handleRemoveFromCard={this.state.handleRemove} />
              </div>
            </div>
          </div> 
        </div>
    );
  }
}

export default App;
