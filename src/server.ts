import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api', routes);
app.get('/', async (req, res) => {
  res.send(`<h1>Welcome to storefront</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
