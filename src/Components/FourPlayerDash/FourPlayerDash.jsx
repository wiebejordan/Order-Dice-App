
import React, { Component } from "react";
import {Button, Grid, Modal, Image, Header, Segment, Transition, Icon,} from "semantic-ui-react";
import "../Dashboard/Dashboard.css";
import { connect } from "react-redux";
import { getGame, clearGame } from "../../redux/gameReducer";


const mapStateToProps = (reduxState) => reduxState;

const FourPlayerDash = () => {

return(
<div>
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
              {this.props.playerOneTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerOne.name} dice in bag:
            </h5>
            {this.props.game.playerOneRemainingDice > 0 ? (
              <h1 style={{ margin: "0" }}>
                {this.props.game.playerOneRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.props.game.playerOneRemainingDice}
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
              {this.props.playerTwoTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerTwo.name} dice in bag:
            </h5>
            {this.props.game.playerTwoRemainingDice > 0 ? (
              <h1 style={{ margin: "0" }}>
                {this.props.playerTwoRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.props.game.playerTwoRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>

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
              {this.props.playerThreeTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerThree.name} dice in bag:
            </h5>
            {this.props.game.playerThreeRemainingDice > 0 ? (
              <h1 style={{ margin: "0" }}>
                {this.props.game.playerThreeRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.props.game.playerThreeRemainingDice}
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
              {this.props.playerFourTotalDice}
            </h1>
          </Segment>
          <Segment>
            <h5 style={{ margin: "0" }}>
              {this.props.playerFour.name} dice in bag:
            </h5>
            {this.props.game.playerFourRemainingDice > 0 ? (
              <h1 style={{ margin: "0" }}>
                {this.props.game.playerFourRemainingDice}
              </h1>
            ) : (
              <h1 style={{ margin: "0", color: "red" }}>
                {this.props.game.playerFourRemainingDice}
              </h1>
            )}
          </Segment>
        </Segment.Group>
        </div>
)
            }

export default connect(mapStateToProps)(FourPlayerDash)