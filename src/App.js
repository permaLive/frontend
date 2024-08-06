import React, { useState } from "react";
import axios from "axios";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [deployUrl, setDeployUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //"https://alwayson-backend.onrender.com/deploy",
  //http://localhost:5001/deploy
  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://alwayson-backend.onrender.com/deploy",
        {
          repoUrl,
        }
      );
      setDeployUrl(response.data.deployUrl);
    } catch (error) {
      console.error("Deployment failed:", error);
      alert("Deployment failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Deploy to Arweave</h1>
      <input
        type="text"
        placeholder="Enter GitHub Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button onClick={handleDeploy} disabled={isLoading}>
        {isLoading ? "Deploying..." : "Deploy"}
      </button>
      {deployUrl && (
        <div>
          <h2>Deployment Successful!</h2>
          <p>
            Access your site at:{" "}
            <a href={deployUrl} target="_blank" rel="noopener noreferrer">
              {deployUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
