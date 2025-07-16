# Azure OpenAI Express API

This project is a Node.js Express API that connects to the Azure OpenAI GPT-4.1 model. It provides a simple interface to interact with the OpenAI service, allowing users to send requests and receive responses.

## Project Structure

```
azure-openai-express-api
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers
│   │   └── openaiController.js # Handles OpenAI API requests
│   ├── routes
│   │   └── openaiRoutes.js   # Defines routes for the application
│   └── config
│       └── azureConfig.js     # Configuration settings for Azure
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd azure-openai-express-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure Azure OpenAI:**
   - Create a file named `azureConfig.js` in the `src/config` directory.
   - Add your Azure OpenAI API key and endpoint in the `azureConfig.js` file.

4. **Run the application:**
   ```
   node src/app.js
   ```

## Usage

- Send a POST request to `/api/openai` with the necessary data to interact with the GPT-4.1 model.
- Example request body:
  ```json
  {
    "prompt": "Hello, how can I assist you today?",
    "maxTokens": 50
  }
  ```

## License

This project is licensed under the MIT License.