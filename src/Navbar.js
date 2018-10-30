
import React, {Component} from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom'


export default class Navbar extends Component {

  constructor() {
    super()
    this.state = {
      tickerName: '',
      sharesOwned: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddStock = this.handleAddStock.bind(this)
    this.handleAddToPortfolio = this.handleAddToPortfolio.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleAddStock() {

  }


  async handleAddToPortfolio() {
    //make input ticker uppercase
    const ticker1 = this.state.tickerName.toUpperCase()
    let newQuantity = this.state.sharesOwned

    //get list of tickers
    const tickers = [];
    for (let i=0; i<this.props.stockList.length; i++) {
      tickers.push(this.props.stockList[i][0])
    }

    //checking if ticker is already in portfolio
    if (tickers.indexOf(this.state.tickerName) !== -1) {
      const oldQuantity = this.props.stockList[tickers.indexOf(this.state.tickerName)][1]
      const message = '//Updated your ownership of ' + ticker1 + ' from ' + oldQuantity + ' to ' + newQuantity
      this.setState = ({
        message
      })
      console.log(message)
    } else {
      //if not checking to make sure ticker actually exists by making a request for AAPL and the input ticker
      console.log('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,'+ticker1+'&types=quote')
      const res2 = await axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,'+ticker1+'&types=quote')
      if (res2.data[ticker1] === undefined) {
        this.setState({
          message: "error"
        })
        throw this.props.msg(' //Ticker does not exist')

      }
    }
    newQuantity = (newQuantity > 0) ? newQuantity : 0

    this.props.addStock(ticker1, newQuantity)



  }





  render() {
    return (
      <div>

        <input type="text" placeholder="Ticker" size='10' maxLength='6' name='tickerName' onChange={this.handleChange} />
        <NavLink to={`/${this.state.tickerName}`}><button>Go to Single Stock Page</button></NavLink>
        <input type="number" placeholder="Shares" name='sharesOwned' size='10' onChange={this.handleChange}/>
        <button disabled={!this.state.tickerName} onClick={this.handleAddToPortfolio}>Add to Portfolio</button>
        <br />
        <p className='Danger'>{this.props.message}</p>

        </div>


    )


  }





}
