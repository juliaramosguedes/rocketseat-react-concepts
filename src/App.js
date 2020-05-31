import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  const handleAddRepository = async () => {
    try {
      const response = await api.post("repositories", {
        title: `New repository ${Date.now()}`,
        url: "https://juliaramos.com.br",
        techs: ["NodeJS", "ReactJS"],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveRepository = async (id) => {
    try {
      const response = await api.delete(`repositories/${id}`);

      if (response.status === 204) {
        const updatedRepositories = repositories.filter(
          (repository) => repository.id !== id
        );

        setRepositories(updatedRepositories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
