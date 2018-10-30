import {Doughnut} from 'react-chartjs-2';
import React, {Component} from 'react'

class HalfDonut extends Component {

  constructor(props) {
    super(props)
    this.state = {
      labels: ['housing', 'food', 'shopping', 'remainder'],
      datasets: [{
        data: [6, 5, 4, 24],
        backgroundColor: ['red', 'blue', 'yellow', '#D3D3D3']
      }]
    }
  }

render() {
  return (
    <div>
    <h1>Age Breakdown Chart</h1>
    <Doughnut
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
        },
        rotation: 1 * Math.PI,
        circumference: 1*Math.PI
      }}
      height='50%'
    />
        <Doughnut
      data={{
        labels: this.state.labels,
        datasets: [{
          data: [6, 25],
          backgroundColor: ['red', '#D3D3D3'],
          label: 'donut1',
          borderColor: 'black'
        },{
          data: [3, 25],
          backgroundColor: ['red', '#D3D3D3'],
          label: 'donut2'
        }]
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
        },
        rotation: 1 * Math.PI,
        circumference: 1.1*Math.PI
      }}
      height='50%'
    />




    <br />
    </div>
  )
  }
}

export default HalfDonut

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
