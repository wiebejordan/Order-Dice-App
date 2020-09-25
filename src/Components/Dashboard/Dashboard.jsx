import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react';
import '../Dashboard/Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      totalDice: 0,
      diceBag: [],
      diceRemaining: 0,
      pulledDice: '',
      turnNum: 1
      
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
  let length = diceBag.length - 1 ;
  let random = Math.floor(Math.random() * length);
  
  let pulledDice = diceBag.splice(random, 1);
  this.setState({pulledDice: pulledDice})
    
}

handleNextTurn = () => {
  this.setState({
    turnNum: this.state.turnNum + 1,
    pulledDice: ''
  })
  this.handleDiceTotal()
}


render(){
  console.log(this.state.diceBag)
  console.log(this.state.pulledDice)
  
  return(
    <div>
      
    <h3>{this.props.playerOne.name} dice: {this.props.playerOne.diceNum}</h3>
    <h3>{this.props.playerTwo.name} dice: {this.props.playerTwo.diceNum}</h3>

    <div className='dice-container'>
    <div className='dice' style={{
      backgroundColor: `${this.state.pulledDice}`,
      height: '100px',
      width: '100px',
      }}>
      <p>{this.state.pulledDice}</p>
      </div>
      </div>
    <h1>turn: {this.state.turnNum}</h1>
    
    
    {this.state.diceBag < 1 ? null : 
    <Button onClick={this.handleDiceDraw}>Draw Dice</Button>
    }

    {this.state.diceBag < 1 ? <Button color='blue' onClick={this.handleNextTurn}>Next Turn</Button> : null
    }

    
    </div>

    
  )
}



}

export default Dashboard;