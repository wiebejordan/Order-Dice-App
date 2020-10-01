import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Segment, Message} from 'semantic-ui-react';
import '../Landing/Landing.css'

const Landing = () => {
  return(
    <div>
      <Container textAlign='center'>
        <Segment>
        <p style={{fontSize: '15px'}}>
          Welcome to the ScaleHistorySLC Order Dice App version 1.3 for Bolt Action! This app makes playing Bolt Action, Warlords of Erewhon, Konflict 47 and other games that use the dice bag mechanic even more Covid-19 friendly! 
        </p>

        <p style={{fontSize: '15px'}}>
          Press the green button to get started, or watch the how-to video below! 
        </p>

        <Message warning>
        <Message.Header> Version 1.3 New Site Features</Message.Header>
        
        <p style={{fontSize: '10px'}}>
          
          Version 1.3 now includes an "undo" button, more dice colors, and updated How-To video! I am currently working on having up to four players! Stay tuned!
        </p>
        </Message>

        <p style={{fontSize: '12px'}}>
          Feel free to leave me feedback by emailing me at <b>wiebe.jordan@yahoo.com </b>  
        </p>

        <p style={{fontSize: '10px'}}>
          *Order Dice and the games mentioned above are owned by <a href='https://store.warlordgames.com/'>Warlord Games</a>  
        </p>
        </Segment>
      </Container>

      <Container>
      <Link to='/setup'>
      <Button  size='huge' color='green' style={{margin: '10px'}}>Begin</Button>
      </Link>
      </Container>
      
      

      <iframe width="560" height="315" src="https://www.youtube.com/embed/U3sW4qxRnh8" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      
      
    </div>
  )
}

export default Landing;