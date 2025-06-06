import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv  from 'dotenv';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express();
dotenv.config();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use(cors({ 
origin: ['https://memories-zy45.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/posts' , postRoutes)
app.use('/user' , userRoutes)


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true , useUnifiedTopology : true})
        .then(() => app.listen(PORT , () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);