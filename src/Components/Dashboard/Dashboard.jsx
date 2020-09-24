import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalDice: 0,
      diceBag: [],
      diceRemaining: 0,
      pulledDice: '' 
    }
  }

componentDidMount = (props) => {
  this.handleDiceTotal()
  
  console.log(this.props)
}

// componentDidUpdate = (prevProps, prevState) => {
//   if (prevProps !== this.props){
//     this.handleDiceTotal()
    
//   }
// }

handleDiceTotal = (props) => {
  const {diceBag} = this.state;
  const {playerOne, playerTwo} = this.props;

  let totalDice = this.props.playerOne.diceNum + this.props.playerTwo.diceNum + this.props.playerThree.diceNum + this.props.playerFour.diceNum;

  for(let i=0; i < playerOne.diceNum; i++){
    diceBag.push(`${playerOne.diceColor}`)
  }

  for(let i=0; i < playerTwo.diceNum; i++){
    diceBag.push(`${playerTwo.diceColor}`)
  }


  this.setState({totalDice: totalDice, diceRemaining: totalDice})
  
  
}

handleDiceDraw = (props) => {
  const {diceBag} = this.state;
  const {playerOne, playerTwo} = this.props;
  let random = Math.ceil(Math.random() * this.state.totalDice -1);


  for(let i=0; i < diceBag.length; i++){
    let pulledDice = diceBag.slice(diceBag[random], diceBag[random] + 1);
    this.setState({pulledDice: diceBag[random] })
    
  }
  console.log(random)
  console.log(this.state.diceBag)
  
}


render(){
  
  console.log(this.state.pulledDice)
  return(
    <div>
      Dashboard
    <h3>{this.props.playerOne.name} dice: {this.props.playerOne.diceNum}</h3>
    <h3>{this.props.playerTwo.name} dice: {this.props.playerTwo.diceNum}</h3>
    <h3>{this.state.pulledDice}</h3>

    <Button onClick={this.handleDiceDraw}>Draw Dice</Button>
    </div>
  )
}



}

export default Dashboard;