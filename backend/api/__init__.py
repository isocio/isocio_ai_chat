from azure.ai.openai import OpenAIClient
from azure.identity import DefaultAzureCredential

# إعداد بيانات الاتصال
endpoint = "https://<your-azure-openai-endpoint>.openai.azure.com/"
api_version = "2024-02-15-preview"  # استخدم النسخة المناسبة

# إنشاء العميل
client = OpenAIClient(endpoint=endpoint, credential=DefaultAzureCredential(), api_version=api_version)dir /s /b