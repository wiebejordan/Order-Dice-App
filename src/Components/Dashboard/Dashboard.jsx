import React, {Component} from 'react';
import {Button, Grid, Modal, Image, Header, Segment, Transition, Icon} from 'semantic-ui-react';
import '../Dashboard/Dashboard.css'
import {connect} from 'react-redux';
import {getGame, clearGame} from '../../redux/gameReducer';
import UndoRedo from '../UndoRedo/UndoRedo';
import { ActionCreators } from 'redux-undo';
import store from '../../redux/store';

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
      playerOneAmbushDice: 0, 
      playerTwoTotalDice: this.props.playerTwo.diceNum,
      playerTwoRemainingDice: this.props.playerTwo.diceNum,
      playerTwoAmbushDice: 0,
      gameOver: false,
      transition: true,
      drawDice: true,
      playerOneUndo: true,
      dotLast: false
      
    }
  }



componentDidMount = (props) => {
  this.handleDiceTotal()
  this.props.getGame(this.state)
}

componentDidUpdate = (prevProps, prevState) => {
  if(prevState !== this.state){
    this.props.getGame(this.state)
    
  } 
  
   
}

handleUndo = () => {
    const {totalDice, playerOneTotalDice, playerOneRemainingDice, playerOneAmbushDice, playerTwoTotalDice, playerTwoRemainingDice, playerTwoAmbushDice, diceBag} = this.props.game.past[this.props.game.past.length-1].game
  
    if(this.state.drawDice === false){
    this.setState({totalDice: totalDice, playerOneTotalDice: playerOneTotalDice, playerOneRemainingDice: playerOneRemainingDice, playerOneAmbushDice: playerOneAmbushDice, playerTwoTotalDice: playerTwoTotalDice, playerTwoRemainingDice: playerTwoRemainingDice, playerTwoAmbushDice: playerTwoAmbushDice, drawDice: true})

    if(this.state.playerOneUndo === true && this.state.dotLast === false){
    diceBag.unshift(this.props.playerOne.diceColor) 
    } 
    else if(this.state.playerOneUndo === false && this.state.dotLast === false)
    diceBag.push(this.props.playerTwo.diceColor)
    }
  
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


  this.setState({totalDice: totalDice, diceRemaining: totalDice, playerOneAmbushDice: 0, playerTwoAmbushDice: 0 })
  
  if(this.state.playerOneTotalDice === 0 || this.state.playerTwoTotalDice === 0){
    this.setState({gameOver: true})
  }
  
}

handleDiceDraw = (props) => {
  const {diceBag} = this.state;
  const {playerOne, playerTwo} = this.props;
  let length = diceBag.length ;
  let random = Math.floor(Math.random() * length);
  
  let pulledDice = diceBag.splice(random, 1);
  this.setState({pulledDice: pulledDice})

  if(pulledDice == this.props.playerOne.diceColor){
    this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1})
  }else if (pulledDice == this.props.playerTwo.diceColor){
    this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1})
  }
  this.setState((prevState) => ({ transition: !prevState.transition, drawDice: true }))
  
}

handleRemoveP1Dice = (props) => {
  const {diceBag} = this.state;

  
  if(this.state.playerOneRemainingDice > 0 ){
      diceBag.splice(0,1);
      this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1}
      );
    
  
    this.setState({playerOneAmbushDice: this.state.playerOneAmbushDice +1, drawDice: false, playerOneUndo: true, dotLast: false})
  }
}

handleRemoveP2Dice = (props) => {
  const {diceBag} = this.state;

  
  if(this.state.playerTwoRemainingDice > 0 ){
      diceBag.splice([this.state.playerOneRemainingDice],1);
      this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1
        });
    
  
    this.setState({playerTwoAmbushDice: this.state.playerTwoAmbushDice +1, drawDice: false, playerOneUndo: false, dotLast: false})
  }
}

handleP1DiBDestroyed = () => {
  const {diceBag, playerOneTotalDice, playerOneRemainingDice, playerOneAmbushDice} = this.state;
  
  
  if(playerOneTotalDice > 0 && playerOneRemainingDice > 0 ){
      diceBag.splice(0,1);
      this.setState({playerOneRemainingDice: this.state.playerOneRemainingDice -1});
      this.setState({playerOneTotalDice: playerOneTotalDice - 1, playerOneRemainingDice: playerOneRemainingDice - 1, drawDice: false, playerOneUndo: true, dotLast: false});
    }
  

  
  }
  


handleP1DoTDestroyed = () => {
  const {diceBag, playerOneTotalDice, playerOneRemainingDice} = this.state;

  if(playerOneTotalDice > 0 && playerOneTotalDice != playerOneRemainingDice ){
  this.setState({playerOneTotalDice: playerOneTotalDice -1, drawDice: false, playerOneUndo: true, dotLast: true})
  }
}

handleP2DiBDestroyed = () => {
  const {diceBag, playerTwoTotalDice, playerTwoRemainingDice} = this.state;

  
    
  if(playerTwoTotalDice >0 && playerTwoRemainingDice > 0){
      diceBag.splice([this.state.playerOneRemainingDice],1);
      this.setState({playerTwoRemainingDice: this.state.playerTwoRemainingDice -1, drawDice: false, playerOneUndo: false, dotLast: false});
    
  
  
  this.setState({playerTwoTotalDice: this.state.playerTwoTotalDice - 1, playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1});
  }
}

handleP2DoTDestroyed = () => {
  const {diceBag, playerTwoTotalDice, playerTwoRemainingDice} = this.state;

  if(playerTwoTotalDice > 0 && playerTwoTotalDice != playerTwoRemainingDice){
  this.setState({playerTwoTotalDice: playerTwoTotalDice -1, drawDice: false, playerOneUndo: true, dotLast: true})
  }
}

handleNextTurn = () => {
  this.setState({
    turnNum: this.state.turnNum + 1,
    pulledDice: '',
    playerTwoRemainingDice: this.state.playerTwoTotalDice,
    playerOneRemainingDice: this.state.playerOneTotalDice, 
    drawDice: true
  })
  this.handleDiceTotal()
}

handleGameOver = () => {
  if(this.state.playerOneTotalDice === 0 || this.state.playerTwoTotalDice === 0){
    this.setState({gameOver: true})
  }
}

handleExit = () => {
  window.location.reload(false);
  this.props.clearGame();
}

render(){
  console.log(this.state.diceBag)
  console.log(this.state.playerOneUndo)
  // console.log(this.props.game.past)

  
  
  return(
    <div>
      <Segment.Group style={{margin: '0'}} horizontal>
        <Segment >
          <h5 style={{margin: '0'}}>{this.props.playerOne.name} total units:  </h5>  
          <h1 style={{margin: '0', color:`${this.props.playerOne.diceColor}`}}>{this.state.playerOneTotalDice}</h1>
        </Segment>
        <Segment>
          <h5 style={{margin: '0'}}>{this.props.playerOne.name} dice in bag:</h5>
          {this.state.playerOneRemainingDice
          ?
          <h1 style={{margin: '0'}}>{this.state.playerOneRemainingDice}</h1>
          :
          <h1 style={{margin: '0', color:'red'}}>{this.state.playerOneRemainingDice}</h1>
          }
        </Segment>
      </Segment.Group>

      <Segment.Group style={{margin: '0'}} horizontal>
      <Segment>
          <h5 style={{margin: '0'}}>{this.props.playerTwo.name} total units:  </h5>  
          <h1 style={{margin: '0', color:`${this.props.playerTwo.diceColor}`}}>{this.state.playerTwoTotalDice}</h1>
        </Segment>
        <Segment>
          <h5 style={{margin: '0'}}>{this.props.playerTwo.name} dice in bag:</h5>
          {this.state.playerTwoRemainingDice > 0
          ?
          <h1 style={{margin: '0'}}>{this.state.playerTwoRemainingDice}</h1>
          :
          <h1 style={{margin: '0', color: 'red'}}>{this.state.playerTwoRemainingDice}</h1>
          }
        </Segment>
      </Segment.Group>

      

    <div className='dice-container'>
        {!this.state.pulledDice ? <b style={{fontSize: '15px', color: 'black', marginLeft:'100px'}}>Draw dice to begin turn {this.state.turnNum}!</b> : null}
    
    <Transition
      animation='pulse'
      duration='500'
      visible={this.state.transition}>
    <div className='dice' style={{
      backgroundColor: `${this.state.pulledDice}`,
      height: '100px',
      width: '100px',
      marginTop: '5px',
      fontWeight: 'bold',
      borderRadius: '5px'
      }}>

      {this.state.pulledDice == this.props.playerOne.diceColor 
      ?
      <p style={{fontSize: '19px'}}> {this.props.playerOne.name} </p>
      :
      <p style={{fontSize: '19px'}}> {this.props.playerTwo.name} </p>
      }
      </div>
      </Transition>
      
      </div>
      
    <h2 >turn: {this.state.turnNum}</h2>
    
    <Grid stackable centered>
      <Grid.Row columns={1}>
    {this.state.diceBag < 1  ? null : 
    <Button size='huge' color='teal' onClick={this.handleDiceDraw}>Draw Dice!</Button>
    }
    {this.state.diceBag < 1 ? <Button size='huge' color='blue' onClick={this.handleNextTurn}>Next Turn</Button> : null
    }
    
    <Button style={{marginLeft: '15px'}} onClick={this.handleUndo}  >
    <Icon name='undo'/>
    </Button>

      </Grid.Row>

    <Button.Group vertical>
    <Button style={{margin: '1px'}} size='big'  color={this.props.playerOne.diceColor} onClick={this.handleRemoveP1Dice}>  Ambush/Down/Snap
    {this.state.playerOneAmbushDice > 0 
    ? 
    ` (${this.state.playerOneAmbushDice})`
    :
    null}</Button>
    <Button style={{margin: '1px'}} size='big' color={this.props.playerOne.diceColor} onClick={this.handleP1DiBDestroyed}> Dice in Bag Destroyed</Button>
    <Button style={{margin: '1px'}} size='big' color={this.props.playerOne.diceColor} onClick={this.handleP1DoTDestroyed}> Dice on table Destroyed</Button>
    </Button.Group>

    <Button.Group vertical>
  <Button style={{margin: '1px'}} size='big' color={this.props.playerTwo.diceColor} onClick={this.handleRemoveP2Dice}> Ambush/Down/Snap
  {this.state.playerTwoAmbushDice > 0 
    ? 
    ` (${this.state.playerTwoAmbushDice})`
    :
    null}
    </Button>
    <Button style={{margin: '1px'}} size='big' color={this.props.playerTwo.diceColor} onClick={this.handleP2DiBDestroyed}> Dice in Bag Destroyed</Button>
    <Button style={{margin: '1px'}} size='big' color={this.props.playerTwo.diceColor} onClick={this.handleP2DoTDestroyed}> Dice on table Destroyed</Button>
    </Button.Group>

   
    

    <Grid.Row columns={1}>
      <Button style={{marginTop: '10px'}} size='tiny' onClick={(e) => { if (window.confirm('Are you sure you want to exit your game?')) this.handleExit(e)}}>
        exit game
      </Button>
    </Grid.Row>
    
    </Grid>

    <Modal open={this.state.gameOver === true}>
      <Modal.Content centered>
        
        
          <Header centered>Game Over!</Header>
          <Button onClick={this.handleExit}>Exit</Button>
        
      </Modal.Content>
    </Modal>
    
    
    </div>

    
  )
}



}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getGame, clearGame})(Dashboard);