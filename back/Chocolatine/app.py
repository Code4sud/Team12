from flask import Flask, request, jsonify
import requests
import pandas as pd

app = Flask(__name__)

def get_additional_data():
    # Lire les données du CSV
    df = pd.read_csv("C:\Users\billy\Documents\Projets\hackathon\data\data_Agglo.csv")

    # Obtenir un résumé des statistiques descriptives
    data_summary = df.describe()

    # Limiter la taille du résumé (par exemple, garder que les 3 premières lignes)
    limited_summary = data_summary.head(3)

    # Convertir le résumé en texte
    return limited_summary.to_string()

@app.route('/generate', methods=['POST'])
def generate():
    # Récupérer le message de l'utilisateur depuis la requête JSON
    user_message = request.json.get("message")
    
    # Obtenir les données supplémentaires depuis le CSV
    additional_data = get_additional_data()

    # Préparer le prompt
    prompt = f"Tu es un expert dans le domaine de la qualité de l'air. Voici les informations : {additional_data}. "
    prompt += f"Voici la question de l'utilisateur : {user_message}"

    # Vérifier la longueur du prompt (estimation simple)
    if len(prompt.split()) > 3000:  # Ajuste ce chiffre selon la limite que tu souhaites
        prompt = "Données trop volumineuses, veuillez réduire la taille des informations supplémentaires."

    # Prépare la requête pour Ollama ou ton modèle
    response = requests.post("http://localhost:5000/generate", json={"message": prompt})

    # Retourner la réponse sous forme JSON
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)