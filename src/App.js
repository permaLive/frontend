import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import SearchBar from "./SearchBar";
import DeploymentCard from "./DeploymentCard";
import DeployedCard from "./DeployedCard";
import ProjectDetails from "./ProjectDetails"; // Import the new component
import { deployedData } from "../src/data/deployedData"; // Import the deployed data

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [deployUrl, setDeployUrl] = useState("");
  const [deployLogs, setDeployLogs] = useState("");
  const [deployProjectName, setDeployProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");

  const handleDeploy = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://alwayson-backend.onrender.com/deploy",
        { repoUrl }
      );
      setDeployUrl(response.data.deployUrl);
      setDeployLogs(response.data.logs);
    } catch (error) {
      console.error("Deployment failed:", error);
      alert("Deployment failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handleConnectWallet = async () => {
    console.log("Connect Wallet button clicked");
    // connect to the extension
    await window.arweaveWallet.connect(
      // request permissions to read the active address
      ["ACCESS_ADDRESS"],
      // provide some extra info for our app
      {
        name: "AlwaysOn",
        logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk",
      },
      // custom gateway
      {
        host: "g8way.io",
        port: 443,
        protocol: "https",
      }
    );

    // obtain the user's wallet address
    const userAddress = await window.arweaveWallet.getActiveAddress();
    setAddress(userAddress);

    // alert("Connecting to Arweave wallet...");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const LocationAwareSearchBar = () => {
    const location = useLocation();
    return location.pathname === "/" ? (
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
    ) : null;
  };

  return (
    <Router>
      <div className="App">
        <Header onConnectWallet={handleConnectWallet} address={address} />
        <LocationAwareSearchBar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="deployment-cards">
                <DeploymentCard
                  repoUrl={repoUrl}
                  deployUrl={deployUrl}
                  onDeploy={handleDeploy}
                  isLoading={isLoading}
                  setRepoUrl={setRepoUrl}
                  deployProjectName={deployProjectName}
                  setDeployProjectName={setDeployProjectName}
                />
                {deployedData.map((data, index) => (
                  <DeployedCard
                    key={index}
                    name={data.name}
                    url={data.url}
                    repoUrl={data.repoUrl}
                    updateDetails={data.updateDetails}
                  />
                ))}
                {/* Add more DeploymentCard components here for past deployments */}
              </div>
            }
          />
          <Route
            path="/project-details/:githubUrl"
            element={
              <ProjectDetails
                deployUrl={deployUrl}
                deployLogs={deployLogs}
                githubUrl={repoUrl}
                deployProjectName={deployProjectName}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
