import React, { Component } from "react";
import {Button, Grid, Modal, Image, Header, Segment, Transition, Icon,} from "semantic-ui-react";
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
      gameOver: false,
      transition: true,
      transition2: true,
      drawDice: true,
      playerOneUndo: true,
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

      if (this.state.playerOneUndo === true && this.state.dotLast === false) {
        diceBag.unshift(this.props.playerOne.diceColor);
      } else if (
        this.state.playerOneUndo === false &&
        this.state.dotLast === false
      )
        diceBag.push(this.props.playerTwo.diceColor);

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
        playerOneUndo: true,
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
        playerOneUndo: false,
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
        playerOneUndo: false,
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
        playerOneUndo: false,
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
        playerOneUndo: true,
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
        playerOneUndo: true,
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
        playerOneUndo: false,
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
        playerOneUndo: true,
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
        playerThreeUndo: true,
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
        playerThreeUndo: true,
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
        playerFourUndo: true,
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
        playerFourUndo: true,
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
    });
    this.handleDiceTotal();
  };

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

  render() {
    console.log(this.state.diceBag);
    console.log(this.state.playerOneUndo);
    console.log('pulled dice', this.state.pulledDice);

    return (
      <div>
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
        ? <Segment.Group style={{ margin: "0" }} horizontal>
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
        
        {this.props.playerCount === 4
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

          <Segment>
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
          <Segment>
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
        {/* ************************************************************************************************** */}

        <div className="dice-container">
          {!this.state.pulledDice ? (
            <b
              style={{ fontSize: "15px", color: "black", marginLeft: "100px" }}
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
                height: "100px",
                width: "100px",
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

        <h2>Turn: {this.state.turnNum}</h2>
        {this.props.playerCount > 2 ? 
         <h2 style={{marginTop: 0}}>Total dice in bag: {this.state.diceBag.length}</h2>
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
              style={{ marginTop: "10px" }}
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
