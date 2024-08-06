import React from "react";
import { FiExternalLink } from "react-icons/fi";

const truncateUrl = (url, maxLength = 30) => {
  if (url.length > maxLength) {
    return `${url.substring(0, maxLength)}...`;
  }
  return url;
};

const DeployedCard = ({ name, url, repoUrl, updateDetails }) => {
  return (
    <div className="deployed-card">
      <h3 className="deployed-card-name">{name}</h3>
      <p className="deployed-card-url">
        <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
          {truncateUrl(url)}
          <FiExternalLink className="external-link-icon" />
        </a>
      </p>
      <p className="deployed-card-repo">
        <a
          href={`https://github.com/${repoUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repoUrl}
          <FiExternalLink className="external-link-icon" />
        </a>
      </p>
      <p className="deployed-card-update">{updateDetails}</p>
    </div>
  );
};

export default DeployedCard;
