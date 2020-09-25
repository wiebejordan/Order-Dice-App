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
      turnNum: 1,
      playerOneTotalDice: this.props.playerOne.diceNum,
      playerOneRemainingDice: this.props.playerOne.diceNum, 
      playerTwoTotalDice: this.props.playerTwo.diceNum,
      playerTwoRemainingDice: this.props.playerTwo.diceNum
      
    }
  }

componentDidMount = (props) => {
  this.handleDiceTotal()
  
 
  console.log(this.props)
}



handleDiceTotal = (props) => {
  const {diceBag, playerOneTotalDice, playerTwoTotalDice} = this.state;
  const {playerOne, playerTwo} = this.props;

  let totalDice = this.props.playerOne.diceNum + this.props.playerTwo.diceNum + this.props.playerThree.diceNum + this.props.playerFour.diceNum;

  for(let i=0; i < playerOneTotalDice; i++){
    diceBag.push(`${playerOne.diceColor}`)
  }

  for(let i=0; i < playerTwoTotalDice; i++){
    diceBag.push(`${playerTwo.diceColor}`)
  }


  this.setState({totalDice: totalDice, diceRemaining: totalDice})
  // this.setState({
  //   playerOneTotalDice: this.props.playerOne.diceNum,
  //   playerTwoTotalDice: this.props.playerTwo.diceNum
  // })
  
}

handleDiceDraw = (props) => {
  const {diceBag} = this.state;
  const {playerOne, playerTwo} = this.props;
  let length = diceBag.length - 1 ;
  let random = Math.floor(Math.random() * length);
  
  let pulledDice = diceBag.splice(random, 1);
  this.setState({pulledDice: pulledDice})

  if(pulledDice == this.props.playerOne.diceColor){
    this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1})
  }else if (pulledDice == this.props.playerTwo.diceColor){
    this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1})
  }
    
}

handleRemoveP1Dice = (props) => {
  const {diceBag} = this.state;

  for(let i = 0; i < diceBag.length; i++){
    if(diceBag[i] === `${this.props.playerOne.diceColor}`){
      diceBag.splice(i,1);
      this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1});
    }
  }
}

handleRemoveP2Dice = (props) => {
  const {diceBag} = this.state;

  for(let i = 0; i < diceBag.length; i++){
    if(diceBag[i] === `${this.props.playerTwo.diceColor}`){
      diceBag.splice(i,1);
      this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1});
    }
  }
}

handleP1DiBDestroyed = () => {
  const {diceBag, playerOneTotalDice, playerOneRemainingDice} = this.state;

  for(let i = 0; i < diceBag.length; i++){
    if(diceBag[i] === `${this.props.playerOne.diceColor}`){
      diceBag.splice(i,1);
      this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1});
    }
  }
  
  if(playerOneTotalDice >0){
  this.setState({playerOneTotalDice: playerOneTotalDice - 1, playerOneRemainingDice: playerOneRemainingDice - 1});
  }
}

handleP1DoTDestroyed = () => {
  const {diceBag, playerOneTotalDice, playerOneRemainingDice} = this.state;

  if(playerOneTotalDice > 0 && playerOneTotalDice != playerOneRemainingDice ){
  this.setState({playerOneTotalDice: playerOneTotalDice -1})
  }
}

handleP2DiBDestroyed = () => {
  const {diceBag} = this.state;

  for(let i = 0; i < diceBag.length; i++){
    if(diceBag[i] === `${this.props.playerTwo.diceColor}`){
      diceBag.splice(i,1);
      this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1});
    }
  }
 
  this.setState({playerTwoTotalDice: this.state.playerTwoTotalDice - 1, playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1});
}

handleP2DoTDestroyed = () => {
  const {diceBag, playerTwoTotalDice, playerTwoRemainingDice} = this.state;

  if(playerTwoTotalDice > 0 && playerTwoTotalDice != playerTwoRemainingDice){
  this.setState({playerTwoTotalDice: playerTwoTotalDice -1})
  }
}

handleNextTurn = () => {
  this.setState({
    turnNum: this.state.turnNum + 1,
    pulledDice: '',
    playerTwoRemainingDice: this.state.playerTwoTotalDice,
    playerOneRemainingDice: this.state.playerOneTotalDice
  })
  this.handleDiceTotal()
}


render(){
  console.log(this.state.diceBag)
  console.log(this.state.pulledDice)
  console.log(this.state.playerOneRemainingDice)
  
  return(
    <div>

    <h3>P1 units: {this.state.playerOneTotalDice} </h3>  
    <h3>{this.props.playerOne.name} dice in bag: {this.state.playerOneRemainingDice}</h3>
    <h3>P2 units: {this.state.playerTwoTotalDice} </h3> 
    <h3>{this.props.playerTwo.name} dice in bag: {this.state.playerTwoRemainingDice}</h3>
    

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
    <Button onClick={this.handleRemoveP1Dice}> P1 Ambush/Down</Button>
    <Button onClick={this.handleRemoveP2Dice}>P2 Ambush/Down</Button>
    <Button onClick={this.handleP1DiBDestroyed}>P1 Dice in Bag Destroyed</Button>
    <Button onClick={this.handleP1DoTDestroyed}>P1 Dice on table Destroyed</Button>
    <Button onClick={this.handleP2DiBDestroyed}>P2 Dice in Bag Destroyed</Button>
    <Button onClick={this.handleP2DoTDestroyed}>P2 Dice on table Destroyed</Button>

    
    </div>

    
  )
}



}

export default Dashboard;