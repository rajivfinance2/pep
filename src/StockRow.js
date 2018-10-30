import React, {Component} from 'react'
import './App.css';
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'



export default class StockRow extends Component {
  // constructor() {
  //   super()
  // }

  render() {

    const iexData = this.props.iexData
    const aTicker = this.props.stock[0]
    let latestPrice;
    let sign;
    let change;

    let marketCap = 0;

    console.log('at', iexData[aTicker])



    if (iexData[aTicker].quote.marketCap > 1000000000000) {
      marketCap = "$" + Math.round(iexData[aTicker].quote.marketCap / 100000000000) / 10 + "T"
    } else if (iexData[aTicker].quote.marketCap > 10000000000) {
      marketCap = "$" + Math.round(iexData[aTicker].quote.marketCap / 1000000000) + "B"
    } else if (iexData[aTicker].quote.marketCap > 1000000000) {
      marketCap = "$" + (Math.round(iexData[aTicker].quote.marketCap / 100000000) / 10).toFixed(1) + "B"
    }
    else if (iexData[aTicker].quote.marketCap > 1000000) {
      marketCap = "$" + Math.round(iexData[aTicker].quote.marketCap / 1000000) + "M"
    } else {
      marketCap = "$" + Math.round(iexData[aTicker].quote.marketCap)
    }

    latestPrice = parseFloat(Math.round(iexData[aTicker].quote.latestPrice * 100)/100).toFixed(2)

    sign = (iexData[aTicker].quote.change < 0) ? '-' : '+'

    change = sign + '$' + Math.abs(parseFloat(iexData[aTicker].quote.change).toFixed(2)).toFixed(2) + " ("+parseFloat(100*iexData[aTicker].quote.changePercent).toFixed(1)+"%)"


    return (

      <tr>

        <NavLink to={`/${this.props.stock[0]}`} >
        <td >{aTicker}</td>
        </NavLink>
        <td>{iexData[aTicker].quote.companyName}</td>
        <td>{iexData[aTicker].quote.sector}</td>
        <td>{marketCap}</td>
        <td>${latestPrice}</td>
        <td className={(sign === '+') ? 'Positive' : 'Negative'}>{change}</td>

      </tr>
    )


  }


}
