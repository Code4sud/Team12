import { Container } from "@/components/Container";
import { useState } from "react";

export const Page = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/chat", { // Assurez-vous que l'URL correspond à votre backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la requête au serveur");
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content); // Supposons que Mistral renvoie une réponse structurée de cette manière
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
            placeholder="Posez votre questions ici..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // Mettez à jour l'état avec la question
          ></textarea>
          <button
            className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
            onClick={handleSubmit} // Appel de la fonction d'envoi
          >
            Envoyer
          </button>
          {response && ( // Afficher la réponse si elle est présente
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