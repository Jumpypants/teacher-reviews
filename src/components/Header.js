import React from "react";

const Header = ({ user, userData }) => {
  const displayName = userData?.name || user?.displayName || "User";
  
  return (
    <header className="header">
      <h1>SchoolScope</h1>
      <p>Find and review teachers</p>
      {user && (
        <div className="user-info">
          Welcome, {displayName}
        </div>
      )}
    </header>
  );
};

export default Header;
