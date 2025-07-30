import React from "react";

const Header = ({ user, userData }) => {
  const displayName = userData?.name || user?.displayName || "User";
  
  return (
    <header className="header">
      <div className="header-brand">
        <img src="/MainIcon.png" alt="SchoolScope" className="header-icon" />
        <div className="header-text">
          <h1>SchoolScope</h1>
          <p>Yelp for Teachers</p>
        </div>
      </div>
      {user && (
        <div className="user-info">
          Welcome, {displayName}
        </div>
      )}
    </header>
  );
};

export default Header;
