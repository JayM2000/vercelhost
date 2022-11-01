const express = require('express');
const app = express();
// const cors = require('cors');
const path = require('path');
// const val = require('./mongoconnection/mongos.js');
// val();

app.use(express.json());

// app.use(cors({credentials:true,origin:"http://localhost:3000"}));
// app.use('/rout',require('./routes/logs'));

// SERVER PUSHING TO HEROKU
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
  }

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running....');
})