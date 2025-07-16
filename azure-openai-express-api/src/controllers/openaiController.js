class OpenAIController {
    constructor(azureOpenAIClient) {
        this.azureOpenAIClient = azureOpenAIClient;
    }

    async getResponse(req, res) {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        try {
            const response = await this.azureOpenAIClient.getChatCompletion({
                model: 'gpt-4.1',
                messages: [{ role: 'user', content: prompt }],
            });

            // Ensure response.data exists, otherwise return the whole response
            return res.status(200).json(response.data ? response.data : response);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            return res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
        }
    }
}

export default OpenAIController;