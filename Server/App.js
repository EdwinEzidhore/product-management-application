import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.js';
import productRoute from './routes/ProductRoutes.js'
import dotenv from 'dotenv';
dotenv.config({path : "./config/.env"});

// console.log("Environment Variables:", {
//   PORT: process.env.PORT,
//   MONGO_URI: process.env.MONGO_URI,
//   LOCAL_FRONTEND_URL: process.env.LOCAL_FRONTEND_URL,
//   PRODUCTION_FRONTEND_URL: process.env.PRODUCTION_FRONTEND_URL
// });

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.LOCAL_FRONTEND_URL,         
  process.env.PRODUCTION_FRONTEND_URL,    
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/users", userRoutes); 
app.use("/api/products", productRoute);

export default app;