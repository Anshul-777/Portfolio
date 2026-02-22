import os
import json
import google.generativeai as genai

# Grab the secret key and the text you typed on your phone
api_key = os.environ.get("GEMINI_API_KEY")
issue_body = os.environ.get("ISSUE_BODY")

# Set up the brain
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.5-flash')

# Tell the agent exactly how to behave
prompt = f"""
You are an autonomous coding agent operating inside a GitHub repository. 
The user has submitted this request via a GitHub issue from their phone:
"{issue_body}"

Read the request and write the necessary code. 
You MUST return your response ONLY as a valid JSON array of objects. 
Each object must have a 'filename' (including the path if needed) and 'content'.
Do not include any other text, markdown formatting, or explanations. 

Example format:
[
  {{"filename": "main.py", "content": "print('hello world')"}},
  {{"filename": "utils/math.py", "content": "def add(a, b): return a + b"}}
]
"""

# Get the code from the AI
response = model.generate_content(prompt)

try:
    # Clean up the text just in case it adds formatting
    text = response.text.strip()
    if text.startswith("```json"):
        text = text[7:]
    if text.endswith("```"):
        text = text[:-3]
    
    # Parse the JSON and write the files
    files_to_write = json.loads(text)
    
    for file_data in files_to_write:
        filename = file_data['filename']
        content = file_data['content']
        
        # Create folders if they don't exist yet
        os.makedirs(os.path.dirname(filename), exist_ok=True) if os.path.dirname(filename) else None
        
        # Write the actual file
        with open(filename, 'w') as f:
            f.write(content)
            
        print(f"Success: Wrote to {filename}")
        
except Exception as e:
    print(f"Error: {e}")
    print("The agent didn't return proper JSON. Raw response was:")
    print(response.text)
    
