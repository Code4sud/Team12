from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Initialiser le pipeline avec le modèle Chocolatine
pipe = pipeline("text-generation", model="jpacifico/Chocolatine-14B-Instruct-DPO-v1.2", trust_remote_code=True)

@app.route('/generate', methods=['POST'])
def generate():
    # Récupérer le message de l'utilisateur depuis la requête JSON
    user_message = request.json.get("message")
    messages = [{"role": "user", "content": user_message}]
    response = pipe(messages)
    
    # Retourner la réponse sous forme JSON
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)