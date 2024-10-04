// Importer les modules avec require
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const apiKey = process.env.MISTRAL_API_KEY;
        if (!apiKey) {
            return res.status(401).json({ error: 'Clé API manquante' });
        }

        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [
                    { role: "user", content: req.body.message }
                ],
                max_tokens: 800
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erreur lors de la requête à Mistral AI:', error);
        res.status(500).json({ error: 'Une erreur interne est survenue.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
