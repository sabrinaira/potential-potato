import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routes.js';

const __dirname = path.resolve();
const PORT = process.env.PORT;
const app = express();

// initialize middleware for handling JSON and request parsing
// In Express, to handle JSON data in POST requests, you need to use the express.json() middleware, which parses incoming request bodies that are in JSON format. Without this, req.body will be undefined.
app.use(express.json());

// allow cors to allow all origins
app.use(cors());

// just for serving html file
app.use(express.static(path.join(__dirname, 'public')));

//mongodb connection string here
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully! '))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

//setting up routers here
app.use('/', routes);

/** 404 Handler */
app.use('*', (req, res) => {
  return res.status(404).send('404 - Request Not Found');
});

/** Global Error Handler */
app.use((err, req, res, next) => {
  /** default error object */
  const defaultErr = {
    log: 'Global error encountered: unknown middleware error.',
    status: 500,
    message: { err: 'An error occured.' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log); // Logs to the console (for devs)
  return res.status(errorObj.status).json(errorObj.message); // Response for the client
});

// listening port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
