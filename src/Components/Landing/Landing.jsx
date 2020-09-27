import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Segment} from 'semantic-ui-react';

const Landing = () => {
  return(
    <div>
      <Container textAlign='center'>
        <Segment>
        <p style={{fontSize: '15px'}}>
          Welcome to the ScaleHistorySLC Order Dice App for Bolt Action! This app makes playing Bolt Action, Warlords of Erewhon, Konflict 47 and other games that use the dice bag mechanic even more Covid-19 friendly! 
        </p>

        <p style={{fontSize: '15px'}}>
          Press the button below to get started!  
        </p>

        <p style={{fontSize: '10px'}}>
          *Order Dice and the games mentioned above are owned by <a href='https://store.warlordgames.com/'>Warlord Games</a>  
        </p>
        </Segment>
      </Container>
      <Link to='/setup'>
      <Button  size='huge' color='green' style={{margin: '10px'}}>Begin</Button>
      </Link>
    </div>
  )
}

export default Landing;