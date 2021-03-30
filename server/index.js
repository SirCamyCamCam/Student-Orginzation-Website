import bodyParser from 'body-parser';
import express from 'express';
import Mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// import routes 
import postsRoutes from './routes/posts.js';
app.use('/posts', postsRoutes);


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());



const CONNECTION_URL = "mongodb+srv://developer:90807060@college-event-website-c.yxr8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

Mongoose.connect(CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


Mongoose.set('useFindAndModify', false);

