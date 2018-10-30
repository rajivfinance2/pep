import React, {Component} from 'react'
import StockRow from './StockRow'
import './App.css';
import {Link} from 'react-router-dom'




export default class StockList extends Component {


  render() {
    let stockList = this.props.stockList
    const loadStockList = this.props.loadStockList
    const iexData = this.props.iexData
    console.log(iexData)
    console.log(stockList)
    console.log(loadStockList)
    console.log(this.props)

    return (
      <div>
      <table className='TickerTable'>
        <tbody>
          <tr className='GrayBackground'>
            <th className='MinimumWidthRow'>Ticker</th>
            <th className='MinimumWidthRow2'>Name</th>
            <th className='MinimumWidthRow2'>Sector</th>
            <th className='MinimumWidthRow'>Market Cap</th>
            <th className='MinimumWidthRow'>Share Price</th>
            <th className='MinimumWidthRow'>Change</th>
          </tr>

      {(loadStockList === 1) && stockList.map(stock => {
          return (
            <StockRow key={stock[0]} stock={stock} iexData={iexData}/>
          )
        })
      }

      </tbody>
      </table>

    </div>
    )
  }
}
