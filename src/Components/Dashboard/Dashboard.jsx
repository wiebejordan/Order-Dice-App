import React, {Component} from 'react';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalDice: 0,
    }
  }

componentDidMount = (props) => {
  this.handleDiceTotal()
  // console.log(this.state.totalDice)
  console.log(this.props)
}

componentDidUpdate = (prevProps, prevState) => {
  if (prevProps !== this.props){
    this.handleDiceTotal()
    console.log(this.state.totalDice)
  }
}

handleDiceTotal = (props) => {
  
  let totalDice = this.props.playerOne.diceNum + this.props.playerTwo.diceNum + this.props.playerThree.diceNum + this.props.playerFour.diceNum;

  this.setState({totalDice: totalDice})
  
}

render(){
  return(
    <div>
      Dashboard
    </div>
  )
}



}

export default Dashboard;