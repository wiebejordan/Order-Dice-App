import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Input, Segment, Button, Message, Container, Checkbox, Modal, Header} from "semantic-ui-react";
import Dashboard from "../Dashboard/Dashboard";
import '../Setup/Setup.css'

const playerCountOptions = [
  {
    key: 2,
    text: "2",
    value: 2,
  },
  {
    key: 3,
    text: "3",
    value: 3,
  },
  {
    key: 4,
    text: "4",
    value: 4,
  },
];

const diceColorOptions = [
  {
    key: "black",
    text: "black",
    value: "black",
  },
  {
    key: "grey",
    text: "grey",
    value: "grey",
  },
  {
    key: "olive",
    text: "olive",
    value: "olive",
  },
  {
    key: "orange",
    text: "orange",
    value: "orange",
  },
  {
    key: "pink",
    text: "pink",
    value: "pink",
  },
  {
    key: "brown",
    text: "brown",
    value: "brown",
  },
  {
    key: "blue",
    text: "blue",
    value: "blue",
  },
];

const diceNumOptions = [
  {
    key: 1,
    text: "1",
    value: 1,
  },
  {
    key: 2,
    text: "2",
    value: 2,
  },
  {
    key: 3,
    text: "3",
    value: 3,
  },
  {
    key: 4,
    text: "4",
    value: 4,
  },
  {
    key: 5,
    text: "5",
    value: 5,
  },
  {
    key: 6,
    text: "6",
    value: 6,
  },
  {
    key: 7,
    text: "7",
    value: 7,
  },
  {
    key: 8,
    text: "8",
    value: 8,
  },
  {
    key: 9,
    text: "9",
    value: 9,
  },
  {
    key: 10,
    text: "10",
    value: 10,
  },
  {
    key: 11,
    text: "11",
    value: 11,
  },
  {
    key: 12,
    text: "12",
    value: 12,
  },
  {
    key: 13,
    text: "13",
    value: 13,
  },
  {
    key: 14,
    text: "14",
    value: 14,
  },
  {
    key: 15,
    text: "15",
    value: 15,
  },
  {
    key: 16,
    text: "16",
    value: 16,
  },
  {
    key: 17,
    text: "17",
    value: 17,
  },
  {
    key: 18,
    text: "18",
    value: 18,
  },
  {
    key: 19,
    text: "19",
    value: 19,
  },
  {
    key: 20,
    text: "20",
    value: 20,
  },
  {
    key: 21,
    text: "21",
    value: 21,
  },
  {
    key: 22,
    text: "22",
    value: 22,
  },
  {
    key: 23,
    text: "23",
    value: 23,
  },
  {
    key: 24,
    text: "24",
    value: 24,
  },
  {
    key: 25,
    text: "25",
    value: 25,
  },
  {
    key: 26,
    text: "26",
    value: 26,
  },
  {
    key: 27,
    text: "27",
    value: 27,
  },
  {
    key: 28,
    text: "28",
    value: 28,
  },
  {
    key: 29,
    text: "29",
    value: 29,
  },
  {
    key: 30,
    text: "30",
    value: 30,
  },
];

const mapStateToProps = (reduxState) => reduxState;

const Setup = () => {
  const [playerCount, setPlayerCount] = useState(2),
    [playerOne, setPlayerOne] = useState({
      name: "one",
      diceNum: 2,
      diceColor: "blue",
    }),
    [playerTwo, setPlayerTwo] = useState({
      name: "two",
      diceNum: 2,
      diceColor: "olive",
    }),
    [playerThree, setPlayerThree] = useState({
      name: "three",
      diceNum: 2,
      diceColor: "brown",
    }),
    [playerFour, setPlayerFour] = useState({
      name: "four",
      diceNum: 2,
      diceColor: "black",
    }),
    [startGame, setStartGame] = useState(false),
    [hideStart, setHideStart] = useState(false),
    [pOneError, setPOneError] = useState(false),
    [pTwoError, setPTwoError] = useState(false),
    [pThreeError, setPThreeError] = useState(false),
    [pFourError, setPFourError] = useState(false),
    [isFrench, setIsFrench] = useState(false),
    [frenchModal, setFrenchModal] = useState(false);

  useEffect(() => {
    if (playerOne.name.length > 10) {
      setPOneError(true);
    } else {
      setPOneError(false);
    }

    if (playerTwo.name.length > 10) {
      setPTwoError(true);
    } else {
      setPTwoError(false);
    }

    if (playerThree.name.length > 10) {
      setPThreeError(true);
    } else {
      setPThreeError(false);
    }

    if (playerFour.name.length > 10) {
      setPFourError(true);
    } else {
      setPFourError(false);
    }
    
  });

  const handlePlayerCount = (e, { value }) => {
    setPlayerCount(value);
    if(value === 2){
      setPlayerThree({name: '', diceNum: 0, diceColor: ''})
      setPlayerFour({name: '', diceNum: 0, diceColor: ''})
    } else if(value === 3){
      setPlayerFour({name: '', diceNum: 0, diceColor: ''})
    }
  };

  const onInputChangeOne = (e, result) => {
    const { name, value } = result || e.target;

    setPlayerOne({ ...playerOne, [name]: value });
  };

  const onInputChangeTwo = (e, result) => {
    const { name, value } = result || e.target;
    setPlayerTwo({ ...playerTwo, [name]: value });
  };

  const onInputChangeThree = (e, result) => {
    const { name, value } = result || e.target;

    setPlayerThree({ ...playerThree, [name]: value });
  };

  const onInputChangeFour = (e, result) => {
    const { name, value } = result || e.target;

    setPlayerFour({ ...playerFour, [name]: value });
  };

  const handleFrench = () => {
    
    setIsFrench(!isFrench)
    
  }

  const handleFrenchModal = () => {
    setFrenchModal(!frenchModal)
  }

  const handleStartGame = () => {
    if (startGame === false) {
      setStartGame(true);
      setHideStart(true);
    } else if (startGame === true) {
      setStartGame(false);
    }
  };

  return (
    <div style={{backgroundColor: '#225316', height: '100%'}}>
      {startGame === false ?
      
      <Grid style={{width: '100vw'}} centered>
        <Grid.Column  width={8}>
          <Segment>
      <h3>Select number of players</h3>
      
      <Dropdown
      placeholder='2'
      defaultValue='2'
      fluid
      selection
      options={playerCountOptions}
      onChange = {handlePlayerCount}
      />
      </Segment> 
      </Grid.Column>
      </Grid>
      :null}

      {startGame === false ? (
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h3>Player 1</h3>
                <h4 style={{ margin: "0" }}>Player Name</h4>
                <Input
                  onChange={(e) => onInputChangeOne(e)}
                  placeholder="enter player name"
                  name="name"
                  value={playerOne.name}
                />
                {pOneError === true ? (
                  <Message negative>
                    <p>Name must be less than 10 characters</p>
                  </Message>
                ) : null}
                <h4 style={{ margin: "0" }}>Number of Order Dice</h4>
                <Dropdown
                  placeholder="number of dice"
                  name="diceNum"
                  value={playerOne.diceNum}
                  onChange={onInputChangeOne}
                  fluid
                  selection
                  options={diceNumOptions}
                />
                <h4 style={{ margin: "0" }}>Order Dice Color</h4>
                <Dropdown
                  placeholder="order dice color"
                  name="diceColor"
                  value={playerOne.diceColor}
                  onChange={onInputChangeOne}
                  fluid
                  selection
                  options={diceColorOptions}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment>
                <h3>Player 2</h3>
                <h4 style={{ margin: "0" }}>Player Name</h4>
                <Input
                  onChange={(e) => onInputChangeTwo(e)}
                  placeholder="enter player name"
                  name="name"
                  value={playerTwo.name}
                />
                {pTwoError === true ? (
                  <Message negative>
                    <p>Name must be less than 10 characters</p>
                  </Message>
                ) : null}
                <h4 style={{ margin: "0" }}>Number of Order Dice</h4>
                <Dropdown
                  placeholder="number of dice"
                  name="diceNum"
                  value={playerTwo.diceNum}
                  onChange={onInputChangeTwo}
                  fluid
                  selection
                  options={diceNumOptions}
                />
                <h4 style={{ margin: "0" }}>Order Dice Color</h4>
                <Dropdown
                  placeholder="order dice color"
                  name="diceColor"
                  value={playerTwo.diceColor}
                  onChange={onInputChangeTwo}
                  fluid
                  selection
                  options={diceColorOptions}
                />
              </Segment>
            </Grid.Column>

            {playerCount ? (
              <Grid.Column>
                <Segment disabled={playerCount < 3}>
                <h3>Player 3</h3>
                <h4 style={{ margin: "0" }}>Player Name</h4>
                <Input
                  onChange={(e) => onInputChangeThree(e)}
                  placeholder="enter player name"
                  name="name"
                  value={playerThree.name}
                />
                {pThreeError === true ? (
                  <Message negative>
                    <p>Name must be less than 10 characters</p>
                  </Message>
                ) : null}
                <h4 style={{ margin: "0" }}>Number of Order Dice</h4>
                <Dropdown
                  placeholder="number of dice"
                  name="diceNum"
                  value={playerThree.diceNum}
                  onChange={onInputChangeThree}
                  fluid
                  selection
                  options={diceNumOptions}
                />
                <h4 style={{ margin: "0" }}>Order Dice Color</h4>
                <Dropdown
                  placeholder="order dice color"
                  name="diceColor"
                  value={playerThree.diceColor}
                  onChange={onInputChangeThree}
                  fluid
                  selection
                  options={diceColorOptions}
                />
              </Segment>
              </Grid.Column>
            ) : null}

            {playerCount ? (
              <Grid.Column>
                <Segment disabled={playerCount < 4}>
                <h3>Player 4</h3>
                <h4 style={{ margin: "0" }}>Player Name</h4>
                <Input
                  onChange={(e) => onInputChangeFour(e)}
                  placeholder="enter player name"
                  name="name"
                  value={playerFour.name}
                />
                {pFourError === true ? (
                  <Message negative>
                    <p>Name must be less than 10 characters</p>
                  </Message>
                ) : null}
                <h4 style={{ margin: "0" }}>Number of Order Dice</h4>
                <Dropdown
                  placeholder="number of dice"
                  name="diceNum"
                  value={playerFour.diceNum}
                  onChange={onInputChangeFour}
                  fluid
                  selection
                  options={diceNumOptions}
                />
                <h4 style={{ margin: "0" }}>Order Dice Color</h4>
                <Dropdown
                  placeholder="order dice color"
                  name="diceColor"
                  value={playerFour.diceColor}
                  onChange={onInputChangeFour}
                  fluid
                  selection
                  options={diceColorOptions}
                />
              </Segment>
              </Grid.Column>
            ) : null}
          </Grid.Row>
        </Grid>
      ) : null}

        {startGame === false ? 
        <Container>
        <Grid centered>
          <Grid.Row>
        <Checkbox onChange={handleFrench}/> 
        <p style={{color: 'white', marginLeft: '5px', marginRight: '5px'}}>Check if a French army is being fielded.  
        </p> 
        <p className='frenchExplain' style={{color: 'cyan'}} onClick={handleFrenchModal}>Why does this matter?</p>
        </Grid.Row>

        </Grid>
        </Container>
      :null}

      {playerCount === 2 &&
      playerOne.name &&
      playerOne.diceNum > 0 &&
      playerOne.diceColor &&
      playerTwo.name &&
      playerTwo.diceNum > 0 &&
      playerTwo.diceColor &&
      hideStart === false &&
      pOneError === false &&
      pTwoError === false ? (

        <Button
          onClick={handleStartGame}
          style={{ marginTop: '10px' }}
          size="huge"
        >
          Start Game
        </Button>
        
      ) : null}

      {playerCount === 3 &&
      playerOne.name &&
      playerOne.diceNum > 0 &&
      playerOne.diceColor &&
      playerTwo.name &&
      playerTwo.diceNum > 0 &&
      playerTwo.diceColor &&
      playerThree.name &&
      playerThree.diceNum > 0 &&
      playerThree.diceColor &&
      hideStart === false &&
      pOneError === false &&
      pTwoError === false &&
      pThreeError === false ?(
        <Button
          onClick={handleStartGame}
          style={{ margin: "10px" }}
          size="huge"
        >
          Start Game
        </Button>
      ) : null}

    {playerCount === 4 &&
      playerOne.name &&
      playerOne.diceNum > 0 &&
      playerOne.diceColor &&
      playerTwo.name &&
      playerTwo.diceNum > 0 &&
      playerTwo.diceColor &&
      playerThree.name &&
      playerThree.diceNum > 0 &&
      playerThree.diceColor &&
      playerFour.name &&
      playerFour.diceNum > 0 &&
      playerFour.diceColor &&
      hideStart === false &&
      pOneError === false &&
      pTwoError === false &&
      pThreeError === false  && 
      pFourError === false ? (
        
        <Button
          onClick={handleStartGame}
          style={{ marginTop: '10px' }}
          size="huge"
        >
          Start Game
        </Button>
        
      ) : null}

      

<Modal
      onClose={() => setFrenchModal(false)}
      onOpen={() => setFrenchModal(true)}
      open={frenchModal}
      // trigger={frenchModal === true}
    >
      <Modal.Header>Communication Breakdown!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Per page 10 of the Armies of France and the Allies, if the first Order Die of the game that is drawn belongs to the 
            French player, his or her opponent may decide that the dice is put back into the bag and a new Order Die is drawn instead.
          </p>
          <p>If one or more players is playing France, or another army that uses this special rule, make sure the box is checked to allow this option to be available to their opponent(s) once the game is started.</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Got it!"
          onClick={() => setFrenchModal(false)}
          positive
        />
      </Modal.Actions>
    </Modal>

      {startGame === false ? null : (
        <Dashboard
          playerOne={playerOne}
          playerTwo={playerTwo}
          playerThree={playerThree}
          playerFour={playerFour}
          playerCount={playerCount}
          isFrench={isFrench}
        />
      )}

      {playerCount === 2 ?
      <div style={{height: '125px'}}>

      </div>
      : null}
    </div>
  );
};

export default connect(mapStateToProps)(Setup);
