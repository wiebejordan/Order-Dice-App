import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Segment} from 'semantic-ui-react';

const Landing = () => {
  return(
    <div>
      <Container textAlign='justified'>
        <Segment>
        <p>
          Welcome to the ScaleHistorySLC Order Dice App for Bolt Action! This app makes playing Bolt Action, Warlords of Erewhon, Konflict 47 and other games that use the dice bag mechanic, even more Covid-19 friendly! 
        </p>

        <p>
          Press the button below to get started!  
        </p>
        </Segment>
      </Container>
      <Link to='/setup'>
      <Button size='huge'>Begin</Button>
      </Link>
    </div>
  )
}

export default Landing;