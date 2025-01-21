import boto3
import streamlit as st

st.title("おしえて！Bedrock")
question = st.text_input("質問を入力")
button = st.button("質問する")

kb = boto3.client("bedrock-agent-runtime")

if button:
    response = kb.retrieve_and_generate(
        input={"text": question},
        retrieveAndGenerateConfiguration={
            "type": "KNOWLEDGE_BASE",
            "knowledgeBaseConfiguration": {
                "knowledgeBaseId": "N0BWDJKXRG",
                "modelArn": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
            },
        },
    )

    st.write(response["output"]["text"])