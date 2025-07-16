
import OpenAI from 'openai';
import type { Message } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_API_BASE,
  dangerouslyAllowBrowser: true, // Required for client-side browser usage
});

const AI_SERVICES_KEY = import.meta.env.VITE_AZURE_AI_SERVICES_KEY;
const AI_SERVICES_ENDPOINT = import.meta.env.VITE_AZURE_AI_SERVICES_ENDPOINT;

export const isApiConfigured = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY && !!import.meta.env.VITE_OPENAI_API_BASE;
};

export const streamChatCompletion = async (history: Message[]): Promise<ReadableStream<Uint8Array>> => {
  const messagesForApi = history.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.content,
  }));

  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo', // On Azure, this is the DEPLOYMENT NAME
    messages: messagesForApi as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    stream: true,
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return readableStream;
};

export const getChatTitle = async (prompt: string): Promise<string> => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // This should also be a deployment name on Azure
            messages: [
                { role: 'system', content: 'You are a title generator. Generate a short, concise title (3-5 words) for the following user prompt. Do not add quotes, punctuation, or any other formatting.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 15,
            temperature: 0.2,
        });
        return response.choices[0].message.content?.trim() || prompt.substring(0, 30);
    } catch (error) {
        console.error("Error getting chat title:", error);
        return prompt.substring(0, 30);
    }
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    // spell-checker: disable-next-line
        const response = await openai.images.generate({
            // spell-checker: disable-next-line
                        model: "dall-e-3", // This is the deployment name for DALL-E 3 on Azure
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });
        if (!response.data || !response.data[0]?.b64_json) {
            throw new Error("No base64 JSON data returned from the API.");
        }
        return response.data[0].b64_json;
};

export const analyzeImageWithAzure = async (imageBuffer: ArrayBuffer) => {
    // spell-checker: disable-next-line
        const url = `${AI_SERVICES_ENDPOINT}/computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption,read&language=en`;
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                // spell-checker: disable-next-line
                'Ocp-Apim-Subscription-Key': AI_SERVICES_KEY
            },
            body: imageBuffer
        });
    if (!response.ok) throw new Error(`Azure Vision API error: ${response.statusText}`);
    const data = await response.json();
    return {
        caption: data.captionResult?.text || "No caption generated.",
        text: data.readResult?.content || "No text found."
    };
};
    // spell-checker: disable-next-line
export const analyzeDocumentWithAzure = async (docBuffer: ArrayBuffer): Promise<string> => {
    const url = `${AI_SERVICES_ENDPOINT}/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2023-07-31`;
    const initialResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': AI_SERVICES_KEY
        },
        body: docBuffer
    });

    if (!initialResponse.ok) throw new Error(`Azure Document Analysis API error: ${initialResponse.statusText}`);

    const resultUrl = initialResponse.headers.get('Operation-Location');
    if (!resultUrl) throw new Error('No Operation-Location header returned from Azure.');

    // Poll until the operation is complete
    let resultData: any;
    while (true) {
        const resultResponse = await fetch(resultUrl, { headers: { 'Ocp-Apim-Subscription-Key': AI_SERVICES_KEY } });
        if (!resultResponse.ok) throw new Error(`Polling failed: ${resultResponse.statusText}`);
        resultData = await resultResponse.json();
        if (resultData.status === 'succeeded') break;
        if (resultData.status !== 'running' && resultData.status !== 'notStarted') {
            throw new Error(`Document analysis failed with status: ${resultData.status}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return resultData.analyzeResult?.content ?? '';
};
