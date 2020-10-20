import React, { Component } from "react";
import {Button, Grid, Modal, Image, Header, Segment, Transition, Icon, Container} from "semantic-ui-react";
import "../Dashboard/Dashboard.css";
import { connect } from "react-redux";
import { getGame, clearGame } from "../../redux/gameReducer";
import FourPlayerDash from '../FourPlayerDash/FourPlayerDash';
import UndoRedo from "../UndoRedo/UndoRedo";
import { ActionCreators } from "redux-undo";
import store from "../../redux/store";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalDice: 0,
      diceBag: [],
      diceRemaining: 0,
      pulledDice: "",
      turnNum: 1,
      playerOneTotalDice: this.props.playerOne.diceNum,
      playerOneRemainingDice: this.props.playerOne.diceNum,
      playerOneAmbushDice: 0,
      playerTwoTotalDice: this.props.playerTwo.diceNum,
      playerTwoRemainingDice: this.props.playerTwo.diceNum,
      playerTwoAmbushDice: 0,
      playerThreeTotalDice: this.props.playerThree.diceNum,
      playerThreeRemainingDice: this.props.playerThree.diceNum,
      playerThreeAmbushDice: 0,
      playerFourTotalDice: this.props.playerFour.diceNum,
      playerFourRemainingDice: this.props.playerFour.diceNum,
      playerFourAmbushDice: 0,
      isFrench: this.props.isFrench,
      firstDice: false,
      gameOver: false,
      transition: true,
      transition2: true,
      drawDice: true,
      whoUndo: null,
      dotLast: false,
    };
  }

  componentDidMount = (props) => {
    this.handleDiceTotal();
    this.props.getGame(this.state);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.props.getGame(this.state);
    }

    
  };

  handleUndo = () => {
    const {
      totalDice,
      playerOneTotalDice,
      playerOneRemainingDice,
      playerOneAmbushDice,
      playerTwoTotalDice,
      playerTwoRemainingDice,
      playerTwoAmbushDice,
      playerThreeTotalDice,
      playerThreeRemainingDice,
      playerThreeAmbushDice,
      playerFourTotalDice,
      playerFourRemainingDice,
      playerFourAmbushDice,
      diceBag,
    } = this.props.game.past[this.props.game.past.length - 1].game;

    if (this.state.drawDice === false) {
      this.setState({
        totalDice: totalDice,
        playerOneTotalDice: playerOneTotalDice,
        playerOneRemainingDice: playerOneRemainingDice,
        playerOneAmbushDice: playerOneAmbushDice,
        playerTwoTotalDice: playerTwoTotalDice,
        playerTwoRemainingDice: playerTwoRemainingDice,
        playerTwoAmbushDice: playerTwoAmbushDice,
        playerThreeTotalDice: playerThreeTotalDice, 
        playerThreeRemainingDice: playerThreeRemainingDice, 
        playerThreeAmbushDice: playerThreeAmbushDice, 
        playerFourTotalDice: playerFourTotalDice,
        playerFourRemainingDice: playerFourRemainingDice,
        playerFourAmbushDice: playerFourAmbushDice, 
        drawDice: true,
      });

      if (this.state.whoUndo === 'playerOne' && this.state.dotLast === false) {
        diceBag.unshift(this.props.playerOne.diceColor);
      } else if (
        this.state.whoUndo === 'playerTwo' &&
        this.state.dotLast === false
      ){
        diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice], 0, this.props.playerTwo.diceColor);
      } else if (
        this.state.whoUndo === 'playerThree' &&
        this.state.dotLast === false
      ){
        diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice + this.state.playerThreeRemainingDice], 0, this.props.playerThree.diceColor);
      } else if (
        this.state.whoUndo === 'playerFour' &&
        this.state.dotLast === false
      ){
        diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice + this.state.playerThreeRemainingDice + this.state.playerFourRemainingDice], 0, this.props.playerFour.diceColor);
      }

      this.setState((prevState) => ({ transition2: !prevState.transition2 }));
    }
  };
  

  handleDiceTotal = (props) => {
    const { diceBag, playerOneTotalDice, playerTwoTotalDice, playerThreeTotalDice, playerFourTotalDice } = this.state;
    const { playerOne, playerTwo, playerThree, playerFour } = this.props;

    let totalDice =
      this.props.playerOne.diceNum +
      this.props.playerTwo.diceNum +
      this.props.playerThree.diceNum +
      this.props.playerFour.diceNum;

    for (let i = 0; i < playerOneTotalDice; i++) {
      diceBag.push(`${playerOne.diceColor}`);
    }

    for (let i = 0; i < playerTwoTotalDice; i++) {
      diceBag.push(`${playerTwo.diceColor}`);
    }

    for (let i = 0; i < playerThreeTotalDice; i++) {
      diceBag.push(`${playerThree.diceColor}`);
    }

    for (let i = 0; i < playerFourTotalDice; i++) {
      diceBag.push(`${playerFour.diceColor}`);
    }

    this.setState({
      totalDice: totalDice,
      diceRemaining: totalDice,
      playerOneAmbushDice: 0,
      playerTwoAmbushDice: 0,
      playerThreeAmbushDice: 0,
      playerFourAmbushDice: 0
    });

    // if (
    //   this.state.playerOneTotalDice === 0 ||
    //   this.state.playerTwoTotalDice === 0
    // ) {
    //   this.setState({ gameOver: true });
    // }
  };

  handleDiceDraw = (props) => {
    const { diceBag } = this.state;
    const { playerOne, playerTwo, playerThree, playerFour } = this.props;
    let length = diceBag.length;
    let random = Math.floor(Math.random() * length);

    let pulledDice = diceBag.splice(random, 1);
    this.setState({ pulledDice: pulledDice });

    if (pulledDice == this.props.playerOne.diceColor) {
      this.setState({
        playerOneRemainingDice: this.state.playerOneRemainingDice - 1,
      });
    } else if (pulledDice == this.props.playerTwo.diceColor) {
      this.setState({
        playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1,
      });
    } else if (pulledDice == this.props.playerThree.diceColor) {
      this.setState({
        playerThreeRemainingDice: this.state.playerThreeRemainingDice - 1,
      });
    } else if (pulledDice == this.props.playerFour.diceColor) {
      this.setState({
        playerFourRemainingDice: this.state.playerFourRemainingDice - 1,
      });
    }
    this.setState((prevState) => ({
      transition: !prevState.transition,
      drawDice: true,
    }));

    if(this.state.diceBag.length === this.state.totalDice-1 && this.state.isFrench === true){
      this.setState({firstDice: true, isFrench: false})
    }
  };

  handleRemoveP1Dice = (props) => {
    const { diceBag } = this.state;

    if (this.state.playerOneRemainingDice > 0) {
      diceBag.splice(0, 1);
      this.setState({
        playerOneRemainingDice: this.state.playerOneRemainingDice - 1,
      });

      this.setState({
        playerOneAmbushDice: this.state.playerOneAmbushDice + 1,
        drawDice: false,
        whoUndo: 'playerOne',
        dotLast: false,
      });
    }
  };

  handleRemoveP2Dice = (props) => {
    const { diceBag } = this.state;

    if (this.state.playerTwoRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice], 1);
      this.setState({
        playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1,
      });

      this.setState({
        playerTwoAmbushDice: this.state.playerTwoAmbushDice + 1,
        drawDice: false,
        whoUndo: 'playerTwo',
        dotLast: false,
      });
    }
  };

  handleRemoveP3Dice = (props) => {
    const { diceBag } = this.state;

    if (this.state.playerThreeRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice], 1);
      this.setState({
        playerThreeRemainingDice: this.state.playerThreeRemainingDice - 1,
      });

      this.setState({
        playerThreeAmbushDice: this.state.playerThreeAmbushDice + 1,
        drawDice: false,
        whoUndo: 'playerThree',
        dotLast: false,
      });
    }
  };

  handleRemoveP4Dice = (props) => {
    const { diceBag } = this.state;

    if (this.state.playerFourRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice + this.state.playerThreeRemainingDice], 1);
      this.setState({
        playerFourRemainingDice: this.state.playerFourRemainingDice - 1,
      });

      this.setState({
        playerFourAmbushDice: this.state.playerFourAmbushDice + 1,
        drawDice: false,
        whoUndo: 'playerFour',
        dotLast: false,
      });
    }
  };

  handleP1DiBDestroyed = () => {
    const {
      diceBag,
      playerOneTotalDice,
      playerOneRemainingDice,
      playerOneAmbushDice,
    } = this.state;

    if (playerOneTotalDice > 0 && playerOneRemainingDice > 0) {
      diceBag.splice(0, 1);
      this.setState({
        playerOneRemainingDice: this.state.playerOneRemainingDice - 1,
      });
      this.setState({
        playerOneTotalDice: playerOneTotalDice - 1,
        playerOneRemainingDice: playerOneRemainingDice - 1,
        drawDice: false,
        whoUndo: 'playerOne',
        dotLast: false,
      });
    }
  };

  handleP1DoTDestroyed = () => {
    const { diceBag, playerOneTotalDice, playerOneRemainingDice } = this.state;

    if (
      playerOneTotalDice > 0 &&
      playerOneTotalDice != playerOneRemainingDice
    ) {
      this.setState({
        playerOneTotalDice: playerOneTotalDice - 1,
        drawDice: false,
        whoUndo: 'playerOne',
        dotLast: true,
      });
    }
  };

  handleP2DiBDestroyed = () => {
    const { diceBag, playerTwoTotalDice, playerTwoRemainingDice } = this.state;

    if (playerTwoTotalDice > 0 && playerTwoRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice], 1);
      this.setState({
        playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1,
        drawDice: false,
        whoUndo: 'playerTwo',
        dotLast: false,
      });

      this.setState({
        playerTwoTotalDice: this.state.playerTwoTotalDice - 1,
        playerTwoRemainingDice: this.state.playerTwoRemainingDice - 1,
      });
    }
  };

  handleP2DoTDestroyed = () => {
    const { diceBag, playerTwoTotalDice, playerTwoRemainingDice } = this.state;

    if (
      playerTwoTotalDice > 0 &&
      playerTwoTotalDice != playerTwoRemainingDice
    ) {
      this.setState({
        playerTwoTotalDice: playerTwoTotalDice - 1,
        drawDice: false,
        whoUndo: 'playerTwo',
        dotLast: true,
      });
    }
  };

  handleP3DiBDestroyed = () => {
    const {
      diceBag,
      playerThreeTotalDice,
      playerThreeRemainingDice,
      playerThreeAmbushDice,
    } = this.state;

    if (playerThreeTotalDice > 0 && playerThreeRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice], 1);
      this.setState({
        playerThreeRemainingDice: this.state.playerThreeRemainingDice - 1,
      });
      this.setState({
        playerThreeTotalDice: playerThreeTotalDice - 1,
        playerThreeRemainingDice: playerThreeRemainingDice - 1,
        drawDice: false,
        whoUndo: 'playerThree',
        dotLast: false,
      });
    }
  };

  handleP3DoTDestroyed = () => {
    const { diceBag, playerThreeTotalDice, playerThreeRemainingDice } = this.state;

    if (
      playerThreeTotalDice > 0 &&
      playerThreeTotalDice != playerThreeRemainingDice
    ) {
      this.setState({
        playerThreeTotalDice: playerThreeTotalDice - 1,
        drawDice: false,
        whoUndo: 'playerFour',
        dotLast: true,
      });
    }
  };

  handleP4DiBDestroyed = () => {
    const {
      diceBag,
      playerFourTotalDice,
      playerFourRemainingDice,
      playerFourAmbushDice,
    } = this.state;

    if (playerFourTotalDice > 0 && playerFourRemainingDice > 0) {
      diceBag.splice([this.state.playerOneRemainingDice + this.state.playerTwoRemainingDice + this.state.playerThreeRemainingDice], 1);
      this.setState({
        playerFourRemainingDice: this.state.playerFourRemainingDice - 1,
      });
      this.setState({
        playerFourTotalDice: playerFourTotalDice - 1,
        playerFourRemainingDice: playerFourRemainingDice - 1,
        drawDice: false,
        whoUndo: 'playerFour',
        dotLast: false,
      });
    }
  };

  handleP4DoTDestroyed = () => {
    const { diceBag, playerFourTotalDice, playerFourRemainingDice } = this.state;

    if (
      playerFourTotalDice > 0 &&
      playerFourTotalDice != playerFourRemainingDice
    ) {
      this.setState({
        playerFourTotalDice: playerFourTotalDice - 1,
        drawDice: false,
        whoUndo: 'playerFour',
        dotLast: true,
      });
    }
  };

  handleNextTurn = () => {
    this.setState({
      turnNum: this.state.turnNum + 1,
      pulledDice: "",
      playerTwoRemainingDice: this.state.playerTwoTotalDice,
      playerOneRemainingDice: this.state.playerOneTotalDice,
      playerThreeRemainingDice: this.state.playerThreeTotalDice,
      playerFourRemainingDice: this.state.playerFourTotalDice,
      drawDice: true,
      whoUndo: null
    });
    this.handleDiceTotal();
  };

  handleFrenchDice = () => {
    const {diceBag, pulledDice, playerOneRemainingDice, playerTwoRemainingDice, playerThreeRemainingDice, playerFourRemainingDice} = this.state;

    if(pulledDice == this.props.playerOne.diceColor){
      diceBag.unshift(this.props.playerOne.diceColor)
      this.setState({playerOneRemainingDice: playerOneRemainingDice + 1 })
    } 
    else if(pulledDice == this.props.playerTwo.diceColor){
      diceBag.splice([playerOneRemainingDice + playerTwoRemainingDice], 0, this.props.playerTwo.diceColor);
      this.setState({playerTwoRemainingDice: playerTwoRemainingDice + 1 })
    }
    else if(pulledDice == this.props.playerThree.diceColor){
      diceBag.splice([playerOneRemainingDice + playerTwoRemainingDice + playerThreeRemainingDice], 0, this.props.playerThree.diceColor);
      this.setState({playerThreeRemainingDice: playerThreeRemainingDice + 1 })
    }
    else if(pulledDice == this.props.playerFour.diceColor){
      diceBag.splice([playerOneRemainingDice + playerTwoRemainingDice + playerThreeRemainingDice + playerFourRemainingDice], 0, this.props.playerFour.diceColor);
      this.setState({playerFourRemainingDice: playerFourRemainingDice + 1 })
    }

    this.setState({isFrench: false, firstDice: false, pulledDice: ''});
  }

  handleGameOver = () => {
    if (
      this.state.playerOneTotalDice === 0 ||
      this.state.playerTwoTotalDice === 0
    ) {
      this.setState({ gameOver: true });
    }
  };

  handleExit = () => {
    window.location.reload(false);
    this.props.clearGame();
  };

  handleModalExit = () => {
    this.setState({firstDice: false})
  }


  render() {
    console.log(this.state.diceBag);
    console.log(this.state.totalDice);
    console.log(this.state.diceRemaining);
    console.log('pulled dice', this.state.pulledDice);

    return (
      <div style={{height: '100%'}} >
        {this.props.playerCount > 1 && this.props.playerCount != 4
        ?
        <Segment.Group style={{ margin: "0" }} horizontal>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerOne.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                color: `${this.props.playerOne.diceColor}`,
              }}
            >
              {this.state.playerOneTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerOne.name} dice in bag:
            </h5>
            {this.state.playerOneRemainingDice ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerOneRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerOneRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>
        :null}
              {this.props.playerCount === 2
        ?
        <Segment.Group style={{ margin: "0" }} horizontal>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerTwo.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                color: `${this.props.playerTwo.diceColor}`,
              }}
            >
              {this.state.playerTwoTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerTwo.name} dice in bag:
            </h5>
            {this.state.playerTwoRemainingDice > 0 ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerTwoRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerTwoRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>
        :null}

        {/* *********************************************************************************************** */}
        
        {this.props.playerCount > 2 && this.props.playerCount != 4
        ? <Segment.Group style={{ margin: "0" }} basic centered horizontal>
        <Segment basic>
          <h5 style={{ margin: "0"}}>
            {this.props.playerTwo.name} total units:{" "}
          </h5>
          <h1
            style={{
              margin: "0",
              color: `${this.props.playerTwo.diceColor}`,
            }}
          >
            {this.state.playerTwoTotalDice}
          </h1>
        </Segment>
        <Segment basic>
          <h5 style={{ margin: "0" }}>
            {this.props.playerTwo.name} dice in bag:
          </h5>
          {this.state.playerTwoRemainingDice ? (
            <h1 style={{ margin: "0" }}>
              {this.state.playerTwoRemainingDice}
            </h1>
          ) : (
            <h1 style={{ margin: "0", color: "red" }}>
              {this.state.playerTwoRemainingDice}
            </h1>
          )}
        </Segment>
      
     
           
        <Segment>
          <h5 style={{ margin: "0" }}>
            {this.props.playerThree.name} total units:{" "}
          </h5>
          <h1
            style={{
              margin: "0",
              color: `${this.props.playerThree.diceColor}`,
            }}
          >
            {this.state.playerThreeTotalDice}
          </h1>
        </Segment>
        <Segment>
          <h5 style={{ margin: "0" }}>
            {this.props.playerThree.name} dice in bag:
          </h5>
          {this.state.playerThreeRemainingDice > 0 ? (
            <h1 style={{ margin: "0" }}>
              {this.state.playerThreeRemainingDice}
            </h1>
          ) : (
            <h1 style={{ margin: "0", color: "red" }}>
              {this.state.playerThreeRemainingDice}
            </h1>
          )}
        </Segment>
      </Segment.Group>
        : null}
        {/* ****************************************************************************************** */}
        <Container>
        {this.props.playerCount === 4
        ?
        
        <Segment.Group style={{ margin: "0" }} compact horizontal>
          <Segment style={{color: this.props.playerOne.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerOne.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                // color: `${this.props.playerOne.diceColor}`,
              }}
            >
              {this.state.playerOneTotalDice}
            </h1>
          </Segment>
          <Segment style={{color: this.props.playerOne.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerOne.name} dice in bag:
            </h5>
            {this.state.playerOneRemainingDice ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerOneRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerOneRemainingDice}
              </h1>
            )}
          </Segment>

          <Segment style={{color: this.props.playerTwo.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerTwo.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                color: `${this.props.playerTwo.diceColor}`,
              }}
            >
              {this.state.playerTwoTotalDice}
            </h1>
          </Segment>
          <Segment style={{color: this.props.playerTwo.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerTwo.name} dice in bag:
            </h5>
            {this.state.playerTwoRemainingDice ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerTwoRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerTwoRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>
        : null}

        {this.props.playerCount === 4
        ?
        <Segment.Group style={{ margin: "0" }} horizontal>
          <Segment style={{color: this.props.playerThree.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerThree.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                color: `${this.props.playerThree.diceColor}`,
              }}
            >
              {this.state.playerThreeTotalDice}
            </h1>
          </Segment>
          <Segment style={{color: this.props.playerThree.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerThree.name} dice in bag:
            </h5>
            {this.state.playerThreeRemainingDice ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerThreeRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerThreeRemainingDice}
              </h1>
            )}
          </Segment>

          <Segment style={{color: this.props.playerFour.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerFour.name} total units:{" "}
            </h5>
            <h1
              style={{
                margin: "0",
                color: `${this.props.playerFour.diceColor}`,
              }}
            >
              {this.state.playerFourTotalDice}
            </h1>
          </Segment>
          <Segment style={{color: this.props.playerFour.diceColor}}>
            <h5 style={{ margin: "0" }}>
              {this.props.playerFour.name} dice in bag:
            </h5>
            {this.state.playerFourRemainingDice ? (
              <h1 style={{ margin: "0" }}>
                {this.state.playerFourRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.state.playerFourRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>
        : null}
        </Container>
        {/* ************************************************************************************************** */}

        <div className="dice-container">
          {!this.state.pulledDice ? (
            <b
              style={{ fontSize: "15px", marginLeft: "100px" }}
            >
              Draw dice to begin turn {this.state.turnNum}!
            </b>
          ) : null}

          <Transition
            animation="pulse"
            duration="500"
            visible={this.state.transition}
          >
            <div
              className="dice"
              style={{
                backgroundColor: `${this.state.pulledDice}`,
                height: "125px",
                width: "125px",
                marginTop: "5px",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
            >
              {this.state.pulledDice == this.props.playerOne.diceColor ? (
                <p style={{ fontSize: "19px" }}>
                  {" "}
                  {this.props.playerOne.name}{" "}
                </p>
              ) : (
                null
              )}
              {this.state.pulledDice == this.props.playerTwo.diceColor ? (
                <p style={{ fontSize: "19px" }}>
                  {" "}
                  {this.props.playerTwo.name}{" "}
                </p>
              ) : (
                null
              )}
              {this.state.pulledDice == this.props.playerThree.diceColor ? (
                <p style={{ fontSize: "19px" }}>
                  {" "}
                  {this.props.playerThree.name}{" "}
                </p>
              ) : (
                null
              )}
              {this.state.pulledDice == this.props.playerFour.diceColor ? (
                <p style={{ fontSize: "19px" }}>
                  {" "}
                  {this.props.playerFour.name}{" "}
                </p>
              ) : (
                null
              )}

            </div>
          </Transition>
        </div>

        <h2 style={{color: 'white'}}>Turn: {this.state.turnNum}</h2>
        {this.props.playerCount > 2 ? 
         <h2 style={{marginTop: 0, color: 'white'}}>Total dice in bag: {this.state.diceBag.length}</h2>
         :null}
        <Grid stackable centered>
          <Grid.Row columns={1}>
            {this.state.diceBag < 1 ? null : (
              <Button size="huge" color="teal" onClick={this.handleDiceDraw}>
                Draw Dice!
              </Button>
            )}
            {this.state.diceBag < 1 ? (
              <Button size="huge" color="blue" onClick={this.handleNextTurn}>
                Next Turn
              </Button>
            ) : null}

            <Transition
              animation="pulse"
              duration="500"
              visible={this.state.transition2}
            >
              <Button style={{ marginLeft: "15px" }} disabled={this.state.drawDice} onClick={this.handleUndo}>
                <Icon name="undo" />
              </Button>
            </Transition>
          </Grid.Row>

          <Button.Group vertical>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerOne.diceColor}
              onClick={this.handleRemoveP1Dice}
            >
              {" "}
              Ambush/Down/Snap
              {this.state.playerOneAmbushDice > 0
                ? ` (${this.state.playerOneAmbushDice})`
                : null}
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerOne.diceColor}
              onClick={this.handleP1DiBDestroyed}
            >
              {" "}
              Dice in Bag Destroyed
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerOne.diceColor}
              onClick={this.handleP1DoTDestroyed}
            >
              {" "}
              Dice on table Destroyed
            </Button>
          </Button.Group>

          <Button.Group vertical>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerTwo.diceColor}
              onClick={this.handleRemoveP2Dice}
            >
              {" "}
              Ambush/Down/Snap
              {this.state.playerTwoAmbushDice > 0
                ? ` (${this.state.playerTwoAmbushDice})`
                : null}
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerTwo.diceColor}
              onClick={this.handleP2DiBDestroyed}
            >
              {" "}
              Dice in Bag Destroyed
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerTwo.diceColor}
              onClick={this.handleP2DoTDestroyed}
            >
              {" "}
              Dice on table Destroyed
            </Button>
          </Button.Group>
          
          {this.props.playerCount > 2
          ?
          <Button.Group vertical>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerThree.diceColor}
              onClick={this.handleRemoveP3Dice}
            >
              {" "}
              Ambush/Down/Snap
              {this.state.playerThreeAmbushDice > 0
                ? ` (${this.state.playerThreeAmbushDice})`
                : null}
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerThree.diceColor}
              onClick={this.handleP3DiBDestroyed}
            >
              {" "}
              Dice in Bag Destroyed
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerThree.diceColor}
              onClick={this.handleP3DoTDestroyed}
            >
              {" "}
              Dice on table Destroyed
            </Button>
          </Button.Group>
          : null}

          {this.props.playerCount > 3
          ?
          <Button.Group vertical>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerFour.diceColor}
              onClick={this.handleRemoveP4Dice}
            >
              {" "}
              Ambush/Down/Snap
              {this.state.playerFourAmbushDice > 0
                ? ` (${this.state.playerFourAmbushDice})`
                : null}
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerFour.diceColor}
              onClick={this.handleP4DiBDestroyed}
            >
              {" "}
              Dice in Bag Destroyed
            </Button>
            <Button
              style={{ margin: "1px" }}
              size="big"
              color={this.props.playerFour.diceColor}
              onClick={this.handleP4DoTDestroyed}
            >
              {" "}
              Dice on table Destroyed
            </Button>
          </Button.Group>
          : null}

          <Grid.Row columns={1}>
            <Button
              style={{ margin: "10px" }}
              size="tiny"
              onClick={(e) => {
                if (window.confirm("Are you sure you want to exit your game?"))
                  this.handleExit(e);
              }}
            >
              exit game
            </Button>
          </Grid.Row>
        </Grid>

        <Modal size='tiny' dimmer='inverted' open={this.state.firstDice === true}>
          <Modal.Content centered>
            <Header centered>Communication Breakdown! </Header>
            <p>The first order dice of the game is <b style={{color: `${this.state.pulledDice}`, fontSize: '20px'}}>{this.state.pulledDice}</b>.</p>
            <p>Does this order dice belong to a French army, or any army with the Communication Breakdown rule?</p>
            <p>If no, simply click the "leave dice in play" button</p>
            <p>If yes, the opponent may decide to return this order dice to the bag, or leave it in play.</p>
            <Button onClick={this.handleFrenchDice}>Return dice to bag</Button>
            <Button onClick={this.handleModalExit}>Leave dice in play</Button>
          </Modal.Content>
        </Modal>

        <Modal open={this.state.gameOver === true}>
          <Modal.Content centered>
            <Header centered>Game Over!</Header>
            <Button onClick={this.handleExit}>Exit</Button>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getGame, clearGame })(Dashboard);
