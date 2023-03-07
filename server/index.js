import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

// Middlewares and API Endpoints
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


// Route
app.get('/', async (req, res) => {
  res.send('Hello from DALL.E! on index');
});

// Server
const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () => console.log('Server started on port 8080'));
	} catch (error) {
		console.log(error);
	}
};

startServer();