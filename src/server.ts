import express from 'express';
import client from './database';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const connection = await client.connect();
  console.log(connection);
  connection.release();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
