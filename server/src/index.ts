import express from 'express';
import * as http from 'http';
import cors from 'cors';
import bidding from './resources/Game/webSocketServer';
// rest of the code remains same

const app = express();

const server = http.createServer(app);

app.use(cors());

const PORT = 3000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
server.listen(PORT, () => {
});
bidding(server);

