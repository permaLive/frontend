import React from "react";

const Header = ({ onConnectWallet, address }) => {
  return (
    <header className="header">
      <div className="logo">AlwaysOn</div>
      <button className="connect-wallet" onClick={onConnectWallet}>
        {address || "Connect Wallet"}
      </button>
    </header>
  );
};

export default Header;
