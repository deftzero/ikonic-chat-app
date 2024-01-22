import cors from 'cors';
import express from 'express';
import http from 'http'
import { ChatGateway } from './chat.gateway';
import { GatewaySessionManager } from './gateway.session';

const app = express();
app.use(cors())

const server = http.createServer(app)
const port = 3000;

// init socket with server
ChatGateway(server)
const gatewaySession = new GatewaySessionManager()

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/rooms', (req, res) => {
  res.json({
    statusCode: 200,
    data: [
      {
        id: 1,
        name: 'Frontend'
      },
      {
        id: 2,
        name: 'Backend'
      },
      {
        id: 3,
        name: 'Devops'
      },
      {
        id: 4,
        name: 'UI/UX Design'
      }
    ],
    errors: null
  })
})


server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});