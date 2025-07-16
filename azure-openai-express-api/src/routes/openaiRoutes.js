import express from 'express';
import OpenAIController from '../controllers/openaiController.js';

const router = express.Router();
const openAIController = new OpenAIController();

function setRoutes(app) {
    router.post('/openai', openAIController.getResponse.bind(openAIController));
    app.use('/api', router);
}

export default setRoutes;