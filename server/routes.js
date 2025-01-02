import express from 'express';
import model from './model.js';

const router = express.Router();

router.get('/', (req, res) => {
  model
    .find()
    .then((data) => {
      res.locals.data = data;
      return res.status(200).send(res.locals.data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'error retrieving data' });
    });
});

router.post('/', (req, res) => {
  const { name, place, year, rating } = req.body;
  console.log('Request Body:', req.body);

  model
    .create({ name, place, year, rating })
    .then((data) => {
      console.log('Data successfully added', data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log('error something something');
      return res
        .status(500)
        .json({ message: 'Error adding data to database.' });
    });
});

router.patch('/user/:id', (req, res) => {});
router.delete('/user/:id', (req, res) => {});

export default router;