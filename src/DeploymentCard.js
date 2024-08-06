import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyRepoData } from "../src/data/myRepos";

function extractTransactionId(url) {
  const baseUrl = "https://arweave.net/";
  if (url.startsWith(baseUrl)) {
    return url.replace(baseUrl, "");
  }
  return null; // or throw an error if the URL is invalid
}

const DeploymentCard = ({
  repoUrl,
  deployUrl,
  onDeploy,
  isLoading,
  setRepoUrl,
  setDeployProjectName,
  deployProjectName,
}) => {
  const navigate = useNavigate();
  const [selectedRepo, setSelectedRepo] = useState("");

  const handleDeploy = async () => {
    await onDeploy();
    if (deployUrl) {
      navigate(`/project-details/${extractTransactionId(deployUrl)}`);
    }
  };

  useEffect(() => {
    if (deployUrl) {
      navigate(`/project-details/${extractTransactionId(deployUrl)}`);
    }
  }, [deployUrl, navigate]);

  const handleRepoChange = (e) => {
    const selectedRepoName = e.target.value;
    setSelectedRepo(selectedRepoName);

    const selectedRepoData = dummyRepoData.find(
      (repo) => repo.repoName === selectedRepoName
    );
    if (selectedRepoData) {
      setRepoUrl(selectedRepoData.repoLink);
    }
  };

  const isDeployDisabled = !deployProjectName || !selectedRepo || isLoading;

  return (
    <div className="deployment-card">
      {!deployUrl && (
        <>
          <h3 className="deployed-card-name">Add New</h3>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={deployProjectName}
            onChange={(e) => setDeployProjectName(e.target.value)}
          />
          <select value={selectedRepo} onChange={handleRepoChange}>
            <option value="" disabled>
              Select a repository
            </option>
            {dummyRepoData.map((repo) => (
              <option key={repo.repoName} value={repo.repoName}>
                {repo.repoName}
              </option>
            ))}
          </select>
          <button onClick={handleDeploy} disabled={isDeployDisabled}>
            {isLoading ? "Deploying..." : "Deploy"}
          </button>
        </>
      )}
    </div>
  );
};

export default DeploymentCard;
