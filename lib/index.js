import Express from 'express';
import http from 'http';
// import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import socketIo from 'socket.io';

import Schema from './schema';
import Funciones from './utils/Funciones';

const app = Express();
const server = http.Server(app);
const io = socketIo(server);

io.on('connection',(client) => {

  console.log('--CONECTO--');

  new Funciones(client,Schema);

});

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

server.listen(8080, () => {
  console.log('--ESCUCHA--');
});
