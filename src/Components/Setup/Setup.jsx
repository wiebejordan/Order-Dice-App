import React, {useState} from 'react';
import { Dropdown, Grid, Input, Segment } from 'semantic-ui-react';


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
    key: 'green',
    text: 'green',
    value: 'green'
  },
  {
    key: 'grey',
    text: 'grey',
    value: 'grey'
  },
  {
    key: 'white',
    text: 'white',
    value: 'white'
  },
  {
    key: 'orange',
    text: 'orange',
    value: 'orange'
  }
]

const Setup = () => {

  const [playerCount, setPlayerCount] = useState(null),
        [playerOne, setPlayerOne] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerTwo, setPlayerTwo] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerThree, setPlayerThree] = useState({name: '', diceNum: 0, diceColor:''}),
        [playerFour, setPlayerFour] = useState({name: '', diceNum: 0, diceColor:''});

  
  const onInputChange = (e, result) => {
    const {name, value} = result || e.target;
    setPlayerOne({...playerOne, [name]: value})
    
    console.log(playerOne)
  }

  // const handleChange = (e, {value}) => setPlayerOne({diceColor: value})

  return(
    <div>
      <Dropdown
      placeholder='Select number of players'
      fluid
      selection
      options={playerCountOptions}
      />
      <Grid stackable columns={2}>
          <Grid.Row>
              <Grid.Column>
              <Segment>
              <h3>Player 1</h3>
              <Input onChange={(e) => onInputChange(e)} placeholder='enter player name' name='name' value={playerOne.name}/>
              <Input onChange={(e) => onInputChange(e)} placeholder='number of dice' name='diceNum' value={playerOne.diceNum}/>
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerOne.diceColor}
              onChange={onInputChange}
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>

              <Grid.Column>
              <Segment>
              <h3>Player 2</h3>
              <Input placeholder='enter player name'/>
              <Input placeholder='number of dice'/>
              <Dropdown
              placeholder='order dice color'
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment>
                <h3>Player 3</h3>
                <Input placeholder='enter player name'/>
                <Input placeholder='number of dice'/>
                <Dropdown
                placeholder='order dice color'
                fluid
                selection
                options={diceColorOptions}
                />
                </Segment>
              </Grid.Column>

              <Grid.Column>
              <Segment>
              <h3>Player 4</h3>
              <Input placeholder='enter player name'/>
              <Input placeholder='number of dice'/>
              <Dropdown
              placeholder='order dice color'
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    </div>
  )
}

export default Setup;