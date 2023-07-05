import { createServer } from './server';
import { log } from './utils/logger';

const port = process.env.PORT || 4000;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
