import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
#print(openai.Model.list())

# Conversation history
conversation = [{"role": "system", "content": "Ask me anything"}]

print("You are now chatting with the AI. Type 'exit' to end the conversation.")

while True:
    user_input = input("You: ")

    # Exit the loop if the user types 'exit'
    if user_input.lower() == 'exit':
        break

    # Add user's message to the conversation history
    conversation.append(
            {'role': 'user', 'content': user_input}
            )

    # Call the OpenAI API to get a response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        temperature=0,
        max_tokens=1024
    )

    # Get the AI's response
    ai_response = response.choices[0].message['content']

    # Print and store the AI's response
    print("AI:", ai_response)
    conversation.append({'role': 'assistant', 'content': ai_response})
