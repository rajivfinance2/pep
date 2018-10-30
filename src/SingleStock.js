import React, {Component} from 'react'
import axios from 'axios'
import StockList from './StockList'
import {Link} from 'react-router-dom'


export default class SingleStock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quoteData: {},
      newsData: {},
      statData: {},
      logoUrl: '',
      peerData: [],
      display: false,
      peerIexData: {},
      socketPrice: 0,
      ir: ''
    }
  }

  async componentDidMount() {
    const tickerId = this.props.match.params.stock.toUpperCase()
    const res = await axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols='+tickerId+'&types=quote,news,chart&range=1m&last=5')
    const res2 = await axios.get('https://api.iextrading.com/1.0/stock/'+tickerId+'/stats')
    const res3 = await axios.get('https://api.iextrading.com/1.0/stock/'+tickerId+'/logo')
    const res4 = await axios.get('https://api.iextrading.com/1.0/stock/'+tickerId+'/peers')

    //create a nested array
    const res4a1 = res4.data
    let res4a2 = [];
    res4a1.map(x => res4a2.push([x]))

    this.setState({
      quoteData: res.data[tickerId].quote,
      newsData: res.data[tickerId].news,
      statData: res2.data,
      logoUrl: res3.data.url,
      peerData: res4a2
    })

    const res5 = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${res4a1}&types=quote,news`)

    const irUrl = 'https://duckduckgo.com/?q=!ducky+' + tickerId +'+Investor+Relations'

    this.setState({
      peerIexData: res5.data,
      ir: irUrl,
      display: true,
    })

    // const script = document.createElement("script");
    // script.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js";
    // script.async = true;
    // document.body.appendChild(script);

    // let socket = io('https://ws-api.iextrading.com/1.0/tops');

    // socket.on('message', message => {
    //   console.log(message)
    //   let stockObj = JSON.parse(message)
    //   console.log(stockObj)
    // });

    // socket.on('connect', () => {
    //   console.log("connect");
    //   // Subscribe to topics (i.e.)
    //   socket.emit('subscribe', tickerId+'+')
    // })




    console.log(this.state)
  }

  render() {


  if (this.state.display && this.state.peerIexData !== {}) {return (

    <div>
      <p>
      <h2>{this.state.quoteData.companyName}</h2>
      <h3> Market Cap: ${Math.round(this.state.quoteData.marketCap / 1000000) + " million"}, Price per Share ${this.state.quoteData.latestPrice.toFixed(2)} </h3>

      <br/>
      <img src={this.state.logoUrl} max-height="250px" />
      <br />
      <br />
      Dividend Yield: {this.state.statData.dividendYield.toFixed(2)}%
      <br />
      Valuation, P/E ratio: {this.state.quoteData.peRatio}
      <br />
      <a href={this.state.ir}>Investor Relations Website</a>

      <h4> Latest Company/Industry News </h4>
      {this.state.newsData.map(item => {
        return (
          <div key={item.url}>
          <a href={item.url}>{item.headline}</a>
          </div>
          )
      })}





      <h4> Peers </h4>

      <StockList stockList={this.state.peerData} iexData={this.state.peerIexData} loadStockList={1} />

      {/* {this.state.peerData.map(peer => {
        return (
          <h3>row</h3>


        )
      })} */}



    </p>
    </div>
  )

  } else {return <p>loading</p>}
}
}


