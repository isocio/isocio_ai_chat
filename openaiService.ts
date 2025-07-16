
import OpenAI from 'openai';
import type { Message, Attachment } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_API_BASE,
  dangerouslyAllowBrowser: true, // Required for client-side browser usage
});

const AZURE_VISION_KEY = import.meta.env.VITE_AZURE_VISION_KEY;
const AZURE_VISION_ENDPOINT = import.meta.env.VITE_AZURE_VISION_ENDPOINT;

export const isApiConfigured = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};

export const streamChatCompletion = async (history: Message[], toolOverride: string | null): Promise<ReadableStream<Uint8Array>> => {
  const messagesForApi = history.map(msg => {
    const content: (OpenAI.Chat.Completions.ChatCompletionContentPartText | OpenAI.Chat.Completions.ChatCompletionContentPartImage)[] = [{
        type: 'text',
        text: msg.content
    }];

    if (msg.attachments) {
        msg.attachments.forEach(att => {
            if (att.type === 'image') {
                content.push({
                    type: 'image_url',
                    image_url: { url: att.content }
                });
            }
        });
    }

    return {
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: content.length === 1 && content[0].type === 'text' ? msg.content : content,
    };
  });
  
  // Vision model is used if attachments are present, otherwise a standard model.
  const model = history.some(m => m.attachments?.some(a => a.type === 'image')) ? 'gpt-4-vision-preview' : 'gpt-4-turbo';

  const stream = await openai.chat.completions.create({
    model: model,
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
            model: 'gpt-3.5-turbo',
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
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: 'b64_json',
    });
    if (!response.data[0].b64_json) {
        throw new Error("No base64 JSON data returned from the API.");
    }
    return response.data[0].b64_json;
};

// Azure AI Vision services remain unchanged
export const analyzeImageWithAzure = async (imageBuffer: ArrayBuffer) => {
    if (!AZURE_VISION_KEY || !AZURE_VISION_ENDPOINT) throw new Error("Azure Vision credentials are not configured.");
    const url = `${AZURE_VISION_ENDPOINT}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption,read&language=en`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': AZURE_VISION_KEY
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

export const analyzeDocumentWithAzure = async (docBuffer: ArrayBuffer): Promise<string> => {
     if (!AZURE_VISION_KEY || !AZURE_VISION_ENDPOINT) throw new Error("Azure Vision credentials are not configured.");
    const url = `${AZURE_VISION_ENDPOINT}/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2023-07-31`;
    
    const initialResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': AZURE_VISION_KEY
        },
        body: docBuffer
    });

    if (!initialResponse.ok) throw new Error(`Azure Document Analysis API error: ${initialResponse.statusText}`);
    
    const resultUrl = initialResponse.headers.get('Operation-Location');
    if (!resultUrl) throw new Error("Could not get result URL from Azure API.");

    // Poll for the result
    let resultResponse;
    let resultData;
    do {
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
        resultResponse = await fetch(resultUrl, { headers: { 'Ocp-Apim-Subscription-Key': AZURE_VISION_KEY } });
        resultData = await resultResponse.json();
    } while (resultData.status === 'running' || resultData.status === 'notStarted');

    if (resultData.status !== 'succeeded') throw new Error(`Document analysis failed with status: ${resultData.status}`);
    
    return resultData.analyzeResult.content;
};