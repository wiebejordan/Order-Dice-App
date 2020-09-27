const express = require('express');
const path = require('path');

const app = express()

app.use(express.json())

app.use(express.static(`${__dirname}/../build`))

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(6000, () => console.log('Server running on 6000'))