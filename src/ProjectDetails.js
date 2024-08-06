import React from "react";
import { useParams } from "react-router-dom";
import "./projectDetails.css";

const ProjectDetails = ({
  deployUrl,
  deployLogs,
  githubUrl,
  deployProjectName,
}) => {
  //   const { githubUrl } = useParams();

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
            <p className="info-title">Deployed URL</p>
            <p className="info-text">{deployUrl}</p>
          </div>
          <div className="info-section">
            <p className="info-title">Domain</p>
            <p className="info-text">Ar-io-alwaysOn.com</p>
          </div>
          <div className="info-section">
            <p className="info-title">Status</p>
            <p className="info-text">Ready</p>
          </div>
        </div>
      </div>
      <div className="build-logs">
        <h2>Build Logs</h2>
        <pre className="terminal-logs">{deployLogs}</pre>
      </div>
    </div>
  );
};

export default ProjectDetails;
