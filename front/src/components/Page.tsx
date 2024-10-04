import { Container } from "@/components/Container";
import { useState } from "react";

// Données des stations avec les polluants et leurs valeurs
const stations = [
  {
    nom_station: "Marseille Place Verneuil",
    adresse: "Place Henri Verneuil",
    polluants: {
      SO2: 25, 
      NO: 50,
      NO2: 60,
      NOx: 70,
      PM10: 40,
      PM2_5: 30
    }
  },
  {
    nom_station: "Marseille Nord",
    adresse: "Septèmes-les-Vallons",
    polluants: {
      SO2: 10, 
      NO: 40,
      NO2: 35,
      NOx: 50,
      PM10: 25,
      PM2_5: 15
    }
  },
  {
    nom_station: "Martigues Caravelle",
    adresse: "Martigues",
    polluants: {
      NO: 55,
      NO2: 42,
      NOx: 80,
      PM10: 60,
      PM2_5: 28
    }
  },
];

// Normes de l'OMS
const omsLimits = {
  SO2: 20, // µg/m³ sur 24 heures
  NO2: 40, // µg/m³ annuel
  PM10_24h: 50, // µg/m³ sur 24 heures
  PM10_annual: 20, // µg/m³ annuel
  PM2_5_24h: 25, // µg/m³ sur 24 heures
  PM2_5_annual: 10, // µg/m³ annuel
};

// Fonction pour créer le prompt contextualisé
const createPrompt = (question) => {
  let prompt = `Tu es un expert de la qualité de l'air à Marseille. Voici les données de pollution de plusieurs stations, comparées aux normes de l'OMS. Réponds à la question posée de manière simple en te basant sur les données des stations (sans forcément les citer) et les normes OMS, où sont les zones plus polluées et quelles sont les moins polluées. Limite ta réponse à 500 tokens et fais des phrases complètes pour présenter les données\n\n`;

  stations.forEach(station => {
    prompt += `1. **${station.nom_station}** (${station.adresse})\n`;
    prompt += `   - Polluants mesurés : `;
    Object.entries(station.polluants).forEach(([pollutant, value]) => {
      prompt += `${pollutant} : ${value} µg/m³, `;
    });
    prompt = prompt.slice(0, -2); 
    prompt += `\n`;
  });

  prompt += `\nLes normes de l'OMS pour les principaux polluants sont :\n`;
  prompt += `- SO2 : ${omsLimits.SO2} µg/m³ (moyenne sur 24 heures)\n`;
  prompt += `- NO2 : ${omsLimits.NO2} µg/m³ (moyenne annuelle)\n`;
  prompt += `- PM10 : ${omsLimits.PM10_24h} µg/m³ (moyenne sur 24 heures), ${omsLimits.PM10_annual} µg/m³ (moyenne annuelle)\n`;
  prompt += `- PM2.5 : ${omsLimits.PM2_5_24h} µg/m³ (moyenne sur 24 heures), ${omsLimits.PM2_5_annual} µg/m³ (moyenne annuelle)\n\n`;

  prompt += `Question : ${question}`;
  return prompt;
};

export const Page = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const fullPrompt = createPrompt(question); // Crée le pré-prompt avec la question

    try {
      const res = await fetch("http://localhost:3000/api/chat", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: fullPrompt }), // Envoye le pré-prompt
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la requête au serveur");
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content); 
    } catch (error) {
      console.error(error);
      setResponse("Une erreur est survenue lors de la récupération de la réponse.");
    }
  };

  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="mt-8 text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Sairch
            </h1>
            <p className="mt-6 py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Utiliser l'intelligence artificielle pour analyser l'impact de la pollution sur l'environnement.
              Grâce à Sairch, obtenez des données précises et des analyses avancées pour comprendre les conséquences
              de la pollution et agir en conséquence.
            </p>
            <div className="mt-4 flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                className="mt-4 w-72 bg-green-500 text-white text-lg py-2 px-4 rounded-xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
              >
                Effectue une recherche
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
          </div>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Projet réalisé avec le <span className="text-green-600">soutien</span>{" "}
            de :
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-8 md:justify-around">
            <div className="pt-4">
              <img
                src="/img/brands/c4s-logo.png"
                width={200}
                height={50}
                alt="Sairch Logo"
              />
            </div>
            <div className="pt-5">
              <img
                src="/img/brands/13-logo.png"
                width={250}
                height={60}
                alt="Bouches du Rhone Logo"
              />
            </div>
            <div className="pt-8">
              <img
                src="/img/brands/onepoint-logo.png"
                width={200}
                height={50}
                alt="Onepoint Logo"
              />
            </div>
            <div className="pt-6">
              <img
                src="/img/brands/sfr-logo.png"
                width={200}
                height={50}
                alt="SFR Logo"
              />
            </div>
            <div className="pt-8">
              <img
                src="/img/brands/microsoft-logo.png"
                width={200}
                height={50}
                alt="Microsoft Logo"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="mt-12 w-full max-w-auto mx-auto">
          <label htmlFor="question" className="block text-gray-700 font-medium mb-2">
            Posez votre question:
          </label>
          <textarea
            id="question"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Posez votre question ici..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // MAJ réponse
          ></textarea>
          <button
            className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
            onClick={handleSubmit} 
          >
            Envoyer
          </button>
          {response && ( // Affiche la réponse si elle est présente
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <h2 className="font-bold">Réponse:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
