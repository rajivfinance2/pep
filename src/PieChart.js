import {Pie} from 'react-chartjs-2';
import React, {Component} from 'react'

class PieChartComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      labels: ['Under 18', 'Age 18-54', 'Age 55+'],
      datasets: [{
        data: [2000, 4000, 2850],
        backgroundColor: ['red', 'blue', 'green']
      }]
    }
  }

render() {
  return (
    <div>
    <h1>Age Breakdown Chart</h1>
    <Pie
      data={{
        labels: this.state.labels,
        datasets: this.state.datasets,
        }}
      options={{
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let value = data.datasets[0].data[tooltipItem.index]
              return commaFormat(value)
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          },
          bodyFontSize: 16
        }
      }}
      height='50%'
    />
    <br />
    </div>
  )
  }
}

export default PieChartComponent

function commaFormat(num) {
  let strNum = num.toString()
  let strSplit = strNum.split('.')
  let result = ''
  let digitSplit = strSplit[0].split('')
  let decSplit = (strSplit[1]) ? ('.'+strSplit[1]) : ('')
  let digitSplitMod = digitSplit.length % 3 - 1

  if (digitSplit.length > 3) {
    for (let i=0; i<digitSplit.length-3; i++) {
      console.log(digitSplit[i])
    if (i % 3 === digitSplitMod) {
      console.log('comma')

      digitSplit[i] = digitSplit[i] + ','
      }
    }
  }

  result = digitSplit.join('') + decSplit
  return result
  }
