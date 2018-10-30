import {Doughnut} from 'react-chartjs-2';
import React, {Component} from 'react'



class PieChart2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [ { value: 3, label: 'a' }, { value: 4, label: 'b' } ],
      data2: {labels: ['a', 'b'], datasets: [{data: [3, 4], backgroundColor: ['#F7464A']}]}
    }
  }



render() {

  return (
    <div>
    <h1>hello</h1>
    <Doughnut data={this.state.data2} height='50%' />
    </div>
  )


}




}



export default PieChart2
