import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalDice: 0,
      dicePull: 0

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
    
  }
}

handleDiceTotal = (props) => {
  
  let totalDice = this.props.playerOne.diceNum + this.props.playerTwo.diceNum + this.props.playerThree.diceNum + this.props.playerFour.diceNum;

  this.setState({totalDice: totalDice})
  
}

handleDiceDraw = (props) => {
  const {playerOne, playerTwo} = this.props;
  let diceBag = [];
  let random = Math.ceil(Math.random() * this.state.totalDice);

  for(let i=0; i < playerOne.diceNum; i++){
    diceBag.push(`${playerOne.diceColor}`)
  }

  for(let i=0; i < playerTwo.diceNum; i++){
    diceBag.push(`${playerTwo.diceColor}`)
  }
  console.log(diceBag)

  this.setState({dicePull: random})
}

render(){
  console.log(this.state.dicePull)
  // console.log(this.state.totalDice)
  return(
    <div>
      Dashboard
    <h3>{this.props.playerOne.name} dice: {this.props.playerOne.diceNum}</h3>
    <h3>{this.props.playerTwo.name} dice: {this.props.playerTwo.diceNum}</h3>

    <Button onClick={this.handleDiceDraw}>Draw Dice</Button>
    </div>
  )
}



}

export default Dashboard;