import cors from 'cors';
import express from 'express';
import http from 'http'
import { ChatGateway } from './chat.gateway';

const app = express();
app.use(cors())

const server = http.createServer(app)
const port = 3000;

// init socket with server
ChatGateway(server)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});