import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./projectDetails.css";
import { ANT } from "@ar.io/sdk/web";

const ProjectDetails = ({
  deployUrl,
  deployLogs,
  githubUrl,
  deployProjectName,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [enteredDomainName, setEnteredDomainName] = useState("");
  const [isConfiguring, setIsConfiguring] = useState(false);

  const addAnt = async () => {
    const ant = ANT.init({
      processId: "Hlp3No791TnKUlvz12MjOOUrpIDtodHAtwIW0n0HVlY",
      signer: window.arweaveWallet,
    });

    const result = await ant.addController({
      controller: "aUhCJYHLXzHyh1HAymoBx3tdS5gaj3e1cZGdgg6wq2Y",
    });
    console.log(result);
  };
  useEffect(() => {
    // Trigger confetti effect on page load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.3, y: 0.6 },
    });
  }, []);

  const handleConfigure = async () => {
    setIsConfiguring(true);
    // Simulate a network request or configuration process
    setTimeout(() => {
      setIsConfiguring(false);
      setDomainName(enteredDomainName);
      setShowPopup(false);
    }, 4000); // 4 seconds delay
  };

  return (
    <div className="project-details">
      <h1 className="project-title">{deployProjectName}</h1>
      <p className="project-subtitle">{githubUrl}</p>
      <div className="project-content">
        <div className="iframe-container">
          <iframe
            src={deployUrl}
            title="Deployed Site"
            width="100%"
            height="400px"
          ></iframe>
        </div>
        <div className="project-info">
          <div className="info-section">
            <div className="info-header">
              <p className="info-title">Deployed URL</p>
            </div>
            <p className="info-text">{deployUrl}</p>
          </div>
          <div className="info-section">
            <div className="info-header">
              <p className="info-title">Status</p>
            </div>
            <p className="info-text status-text">Ready</p>
          </div>
          <div className="info-section">
            <div className="info-header">
              <p className="info-title">Add Ar-Io Domain</p>
              {!domainName && (
                <button
                  className="add-domain-button"
                  onClick={() => setShowPopup(true)}
                >
                  +
                </button>
              )}
            </div>
            <p className="info-text domain-text">
              {domainName || "No domain added"}
            </p>
          </div>
        </div>
      </div>
      <div className="build-logs">
        <h2>Build Logs</h2>
        <pre className="terminal-logs">{deployLogs}</pre>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add Domain</h3>
            <input
              type="text"
              value={enteredDomainName}
              onChange={(e) => setEnteredDomainName(e.target.value)}
              placeholder="Enter domain name"
            />
            <div className="popup-actions">
              <button
                onClick={handleConfigure}
                disabled={isConfiguring}
                className="configure-button"
              >
                {isConfiguring ? "Configuring..." : "Configure"}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
