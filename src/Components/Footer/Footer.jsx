import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

const Footer = () => {
  return(
    <div style={{marginTop: '30px'}}>
      <Button size='mini'  href='https://www.instagram.com/scalehistoryslc/' icon>
    <Icon name='instagram' />
      @ScaleHistorySLC
    </Button>
      <p>Created by Jordan Wiebe 09/2020</p>
    </div>
  )
}

export default Footer