import React, {Component} from 'react';
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

class SetupClass extends Component{
  constructor(props){
    super(props);
    
    this.state= {
      playerCount: 2,
      playerOne: {
        name: '',
        diceNum: 0,
        diceColor: ''
      },
      playerTwo: {
        name: '',
        diceNum: 0,
        diceColor: ''
      },
      playerThree: {
        name: '',
        diceNum: 0,
        diceColor: ''
      },
      playerFour: {
        name: '',
        diceNum: 0,
        diceColor: ''
      }
    }
    
  }
  
  
  handlePlayerCount = (e, {value}) => {
    this.setState({playerCount: value});
    // console.log(this.playerCount)
  }

  
   onInputChangeOneDice = (e, {value}) => {
    this.setState({playerOne:{diceNum: value}})
    
    console.log(this.playerOne)
  }

   onInputChangeTwo = (e) => {
    this.setState({playerOne:{[e.target.name]: e.target.value}})
    
    
    
    // console.log(playerTwo)
  }

   onInputChangeThree = (e) => {
    this.setState({playerOne:{[e.target.name]: e.target.value}})
    
    
    
    // console.log(playerThree)
  }

   onInputChangeFour = (e) => {
    this.setState({playerOne:{[e.target.name]: e.target.value}})
    
    
    // console.log(playerFour)
  }

  // const handleChange = (e, {value}) => setPlayerOne({diceColor: value})
  render(){
    let {playerOne, playerTwo, playerThree, playerFour, playerCount} = this.state;
  return(
    <div>
      <Dropdown
      placeholder='Select number of players'
      fluid
      selection
      options={playerCountOptions}
      value={playerCount}
      onChange = {this.handlePlayerCount}
      />
      <Grid stackable columns={2}>
          <Grid.Row>
              <Grid.Column>
              <Segment>
              <h3>Player 1</h3>
              <Input onChange={(e) => this.onInputChangeOne(e)} placeholder='enter player name' name='name' value={playerOne.name}/>
              
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerOne.diceNum}
              onChange={this.onInputChangeOne}
              fluid
              selection
              options={diceNumOptions}
              />
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerOne.diceColor}
              onChange={this.onInputChangeOne}
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>

              <Grid.Column>
              <Segment>
              <h3>Player 2</h3>
              <Input onChange={(e) => this.onInputChangeTwo(e)} placeholder='enter player name' name='name' value={playerTwo.name}/>
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerTwo.diceNum}
              onChange={this.onInputChangeTwo}
              fluid
              selection
              options={diceNumOptions}
              />
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerTwo.diceColor}
              onChange={this.onInputChangeTwo}
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
                <Input onChange={(e) => this.onInputChangeThree(e)} placeholder='enter player name' name='name' value={playerThree.name}/>
                <Dropdown
                placeholder='number of dice'
                name='diceNum'
                value={playerThree.diceNum}
                onChange={this.onInputChangeThree}
                fluid
                selection
                options={diceNumOptions}
                />
                <Dropdown
                placeholder='order dice color'
                name='diceColor'
                value={playerThree.diceColor}
                onChange={this.onInputChangeThree}
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
              <Input onChange={(e) => this.onInputChangeFour(e)} placeholder='enter player name' name='name' value={playerFour.name}/>
              <Dropdown
              placeholder='number of dice'
              name='diceNum'
              value={playerFour.diceNum}
              onChange={this.onInputChangeFour}
              fluid
              selection
              options={diceNumOptions}
              />
              <Dropdown
              placeholder='order dice color'
              name='diceColor'
              value={playerFour.diceColor}
              onChange={this.onInputChangeFour}
              fluid
              selection
              options={diceColorOptions}
              />
              </Segment>
              </Grid.Column>
              :null}
          </Grid.Row>
      </Grid>
    </div>
  )
}
}

export default SetupClass;