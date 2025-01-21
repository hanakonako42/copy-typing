import json
import boto3

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1"
    )

body = json.dumps(
    {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1000,
        "messages": [
            {
                "role": "user",
                "content": "ちいかわについて教えてください。",
            }
        ]
    }
)

modelId = "anthropic.claude-3-sonnet-20240229-v1:0"
contentType = "application/json"
accept = "application/json"

response = bedrock_runtime.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)
response_body = json.loads(response.get("body").read())

answer = response_body["content"][0]["text"]
print(answer)

    