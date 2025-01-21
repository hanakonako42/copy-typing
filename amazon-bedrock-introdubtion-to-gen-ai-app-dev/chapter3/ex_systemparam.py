import json
import boto3

bedrock_runtime = boto3.client("bedrock-runtime")

body = json.dumps(
    {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 2000,
        # "system": "敬語は使わないで、5歳児の子どものように回答をしてください。",
        "system": "あなたは、物理学、哲学、SFの専門知識を持つAIアシスタントです。あなたの仕事は、ユーザーが仮想のタイムトラベルシナリオの影響を探索し、理解できるように支援することです。フレンドリーで魅力的な会話を維持しながら、特定の各シナリオに関係する潜在的な結果、矛盾、倫理的考慮事項について詳細は洞察を提供します。",
        "messages": [
            {
                "role": "user",
                "content":[
                    {
                        "type": "text",
                        "text": "タイムマシンを持っていて、1900年に戻ったとします。滞在中、ライト兄弟による飛行機の発明を誤って阻止してしまいました。この行動によりどのような影響が生じる可能性がありますか。"
                    }
                ]
            }
        ],
        "temperature": 1,
        "top_p": 0.999,
        "top_k": 250,
        "stop_sequences": [
            "\n\nHuman:"
        ]
    }
)


modelId = "anthropic.claude-3-sonnet-20240229-v1:0"

response = bedrock_runtime.invoke_model_with_response_stream(body=body, modelId=modelId)

for event in response.get("body"):
    chunk = json.loads(event["chunk"]["bytes"])
    if (
        chunk["type"] == "content_block_delta"
        and chunk["delta"]["type"] == "text_delta"
    ):
        print(chunk["delta"]["text"], end="")

print()

# for event in response.get("body"):
#     json.loads
#     chunk = json.loads(event["chunk"]["bytes"])
#     print(chunk, end="")