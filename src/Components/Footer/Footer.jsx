import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

const Footer = () => {
  return(
    <div style={{backgroundColor:'#1b4111', height: '125px'}}>
      <p style={{color: 'white', paddingTop: '30px', textAlign: 'center'}}>Created by Jordan Wiebe 09/2020</p>
      
      <Button   size='mini'  href='http://baorderdiceapp.com/' icon>
    <Icon name='home' />
      
    </Button>
      <Button size='mini'  href='https://www.instagram.com/scalehistoryslc/' icon>
    <Icon name='instagram' />
      @scalehistoryslc
    </Button>
    </div>
  )
}

export default Footer