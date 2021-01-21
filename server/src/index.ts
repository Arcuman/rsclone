import * as http from 'http';

import bidding from './resources/game/webSocketServer';
import { PORT } from './config/config';
import app from './app';

const server = http.createServer(app);
server.listen(PORT, () => {});

bidding(server);
