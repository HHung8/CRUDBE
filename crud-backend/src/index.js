import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js'

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);

app.listen(port, () => {
    console.log("Listing on port:", port)
});

