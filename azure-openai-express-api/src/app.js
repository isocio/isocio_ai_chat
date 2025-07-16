import express from 'express';
import bodyParser from 'body-parser';
import openaiRoutes from './routes/openaiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/openai', openaiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});