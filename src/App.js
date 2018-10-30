import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import axios from 'axios';


import logo from './logo.svg';
import './App.css';
import StockList from './StockList'
import Navbar from './Navbar'
import SingleStock from './SingleStock'
import PieChartComponent from './PieChart'
import HalfDonut from './halfdonut'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockList: [['AAPL', 10], ['FB', 20], ['MDB', 30]],
      iexData: {},
      loadStockList: 0,
      message: ''
    }
    this.addStock = this.addStock.bind(this)
    this.msg = this.msg.bind(this)
  }

  async addStock(ticker, sharesOwned) {
    const newStock = [];
    newStock.push(ticker);
    newStock.push(sharesOwned);
    const tickers = [];
    for (let i=0; i<this.state.stockList.length; i++) {
      tickers.push(this.state.stockList[i][0])
    }
    tickers.push(ticker)
    console.log("tickers", tickers)
    const resNew = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote,news`)
    console.log(resNew)
    this.setState({
      stockList: [...this.state.stockList, newStock],
      iexData: resNew.data,
      message: ''
    })

  }
  async componentDidMount() {
    const tickers = [];
    for (let i=0; i<this.state.stockList.length; i++) {
      tickers.push(this.state.stockList[i][0])
    }
    console.log("tickers", tickers)
    const res = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote,news`)
    console.log(res.data)
    this.setState({
      iexData: res.data,
      loadStockList: 1
    })
  }

  msg(message) {
    this.setState({
      message
    })
  }

  removeStock(ticker) {


  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rajiv Finance</h1>
        </header>
        <p className="App-intro">
        </p>
        <Navbar addStock={this.addStock} stockList={this.state.stockList} msg={this.msg} message={this.state.message}/>
        <br />
        <br />
        <Route path='/:stock' component={SingleStock} />
        <Route path='/piechart' component={PieChartComponent}/>
        <Route path='/halfdonut' component={HalfDonut} />
        <StockList stockList={this.state.stockList} iexData={this.state.iexData} loadStockList={this.state.loadStockList} />
        <br />

        Website by Rajiv Bhatia, CFA. Data provided for free by IEX.
        <a href='https://iextrading.com/api-exhibit-a/'>View Terms of Use</a>
        <br />
      </div>
    );
  }
}

export default App;
