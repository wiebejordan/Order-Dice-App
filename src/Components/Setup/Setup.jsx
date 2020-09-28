import React, {useState, useEffect} from 'react';
import { Dropdown, Grid, Input, Segment, Button, Message } from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard'


const playerCountOptions = [
  {
    key: 2,
    text: '2',
    value: 2,
  },
  {
    key: 3,
    text: '3',
    value: 3,
  },
  {
    key: 4,
    text: '4',
    value: 4,
  },
]

const diceColorOptions = [
  {
    key: 'black',
    text: 'black',
    value: 'black'
  },
  {
    key: 'grey',
    text: 'grey',
    value: 'grey'
  },
  {
    key: 'olive',
    text: 'olive',
    value: 'olive'
  },
  {
    key: 'orange',
    text: 'orange',
    value: 'orange'
  },
  {
    key: 'pink',
    text: 'pink',
    value: 'pink'
  },
  {
    key: 'brown',
    text: 'brown',
    value: 'brown'
  }
]

const diceNumOptions = [
  {
    key: 1,
    text: '1',
    value: 1
  },
  {
    key: 2,
    text: '2',
    value: 2
  },
  {
    key: 3,
    text: '3',
    value: 3
  },
  {
    key: 4,
    text: '4',
    value: 4
  },
  {
    key: 5,
    text: '5',
    value: 5
  },
  {
    key: 6,
    text: '6',
    value: 6
  },
  {
    key: 7,
    text: '7',
    value: 7
  },
  {
    key: 8,
    text: '8',
    value: 8
  },
  {
    key: 9,
    text: '9',
    value: 9
  },
  {
    key: 10,
    text: '10',
    value: 10
  },
  {
    key: 11,
    text: '11',
    value: 11
  },
  {
    key: 12,
    text: '12',
    value: 12
  },
  {
    key: 13,
    text: '13',
    value: 13
  },
  {
    key: 14,
    text: '14',
    value: 14
  },
  {
    key: 15,
    text: '15',
    value: 15
  },
  {
    key: 16,
    text: '16',
    value: 16
  },
  {
    key: 17,
    text: '17',
    value: 17
  },
  {
    key: 18,
    text: '18',
    value: 18
  },
  {
    key: 19,
    text: '19',
    value: 19
  },
  {
    key: 20,
    text: '20',
    value: 20
  },
  {
    key: 21,
    text: '21',
    value: 21
  },
  {
    key: 22,
    text: '22',
    value: 22
  },
  {
    key: 23,
    text: '23',
    value: 23
  },
  {
    key: 24,
    text: '24',
    value: 24
  },
  {
    key: 25,
    text: '25',
    value: 25
  },
]

const Setup = () => {

  const [playerCount, setPlayerCount] = useState(2),
        [playerOne, setPlayerOne] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerTwo, setPlayerTwo] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerThree, setPlayerThree] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerFour, setPlayerFour] = useState({name: '', diceNum: 0, diceColor:''}),
        [startGame, setStartGame] = useState(false),
        [hideStart, setHideStart] = useState(false),
        [pOneError, setPOneError] = useState(false),
        [pTwoError, setPTwoError] = useState(false)
  
  useEffect(() => {
    if(playerOne.name.length > 10){
      setPOneError(true)
    }else{setPOneError(false)}

    if(playerTwo.name.length > 10){
      setPTwoError(true)
    }else{setPTwoError(false)}
    console.log(playerTwo.name.length, pOneError) 
    
  })


  
  const handlePlayerCount = (e, {value}) => {
    setPlayerCount(value);
    
  }

  
  const onInputChangeOne = (e, result) => {
    const {name, value} = result || e.target;

    setPlayerOne({...playerOne, [name]: value});
    
    
  }

  const onInputChangeTwo = (e, result) => {
    const {name, value} = result || e.target;
    setPlayerTwo({...playerTwo, [name]: value});
    
    
    
  }

  const onInputChangeThree = (e, result) => {
    const {name, value} = result || e.target;
    
    setPlayerThree({...playerThree, [name]: value});
    
    
    
  }

  const onInputChangeFour = (e, result) => {
    const {name, value} = result || e.target;
    
    setPlayerFour({...playerFour, [name]: value});
    
    
  }

  const handleStartGame = () => {
    if(startGame === false){
    setStartGame(true);
    setHideStart(true)
    }
    else if(startGame === true){
      setStartGame(false)
    }
  }

  

  

  return(
    <div>
      {/* {startGame === false ?  
      <Dropdown
      placeholder='Select number of players'
      fluid
      selection
      options={playerCountOptions}
      onChange = {handlePlayerCount}
      />:null} */}

      {startGame === false  ? 
      <Grid stackable columns={2}>
          <Grid.Row>
              <Grid.Column>
              <Segment>
              <h3>Player 1</h3>
              <h4 style={{margin: '0'}}>Player Name</h4>
              <Input onChange={(e) => onInputChangeOne(e)} placeholder='enter player name' name='name' value={playerOne.name}/>
              {pOneError === true 
              ? <Message negative> 
                <p>Name must be less than 10 characters</p>
              </Message>
              : null}
              <h4 style={{margin: '0'}}>Number of Order Dice</h4>
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerOne.diceNum}
              onChange={onInputChangeOne}
              fluid
              selection
              options={diceNumOptions}
              />
              <h4 style={{margin: '0'}}>Order Dice Color</h4>
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
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
              <h4 style={{margin: '0'}}>Player Name</h4>
              <Input onChange={(e) => onInputChangeTwo(e)} placeholder='enter player name' name='name' value={playerTwo.name}/>
              {pTwoError === true 
              ? <Message negative> 
                <p>Name must be less than 10 characters</p>
              </Message>
              : null}
              <h4 style={{margin: '0'}}>Number of Order Dice</h4>
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerTwo.diceNum}
              onChange={onInputChangeTwo}
              fluid
              selection
              options={diceNumOptions}
              />
              <h4 style={{margin: '0'}}>Order Dice Color</h4>
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerTwo.diceColor}
              onChange={onInputChangeTwo}
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>

              {playerCount > 2
              ?
              <Grid.Column>
                <Segment>
                <h3>Player 3</h3>
                <Input onChange={(e) => onInputChangeThree(e)} placeholder='enter player name' name='name' value={playerThree.name}/>
                <Dropdown
                placeholder='number of dice'
                name='diceNum'
                value={playerThree.diceNum}
                onChange={onInputChangeThree}
                fluid
                selection
                options={diceNumOptions}
                />
                <Dropdown
                placeholder='order dice color'
                name='diceColor'
                value={playerThree.diceColor}
                onChange={onInputChangeThree}
                fluid
                selection
                options={diceColorOptions}
                />
                </Segment>
              </Grid.Column>
              :null}

              {playerCount > 3
              ?
              <Grid.Column>
              <Segment>
              <h3>Player 4</h3>
              <Input onChange={(e) => onInputChangeFour(e)} placeholder='enter player name' name='name' value={playerFour.name}/>
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerFour.diceNum}
              onChange={onInputChangeFour}
              fluid
              selection
              options={diceNumOptions}
              />
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerFour.diceColor}
              onChange={onInputChangeFour}
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>
              :null}
          </Grid.Row>
      </Grid>:null}

          
          {playerOne.name && playerOne.diceNum > 0 && playerOne.diceColor && playerTwo.name && playerTwo.diceNum > 0 && playerTwo.diceColor && hideStart === false && pOneError === false && pTwoError === false ? <Button onClick={handleStartGame} style={{margin: '10px'}} size='huge'>Start Game</Button> : null}
          

          {startGame === false ? null 
          :
        <Dashboard playerOne={playerOne} playerTwo={playerTwo} playerThree={playerThree} playerFour={playerFour}/>
          }

    </div>
  )
}

export default Setup;