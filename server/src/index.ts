import express from 'express';
import * as http from 'http';

import bidding from './resources/Game/webSocketServer'; 
import  {router} from './controllers/users/user.router';
// rest of the code remains same

import {PORT} from './config/config';	
import app from './app';

/* const app = express();

app.use(cors());
app.use('/', (req:any, res:any, next:any) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
// app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/users', (req, res) => res.send('users'));
*/
const server = http.createServer(app);
server.listen(PORT, () => {
});

bidding(server);

/*

// connectToDB(() => {	// rest of the code remains same
app.listen(Number(PORT), () =>{	
  // console.log(`App is running on http://localhost:${PORT}`)	const app = express();
},	
); */