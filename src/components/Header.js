import React from "react";

const Header = ({ user, userData }) => {
  const displayName = userData?.name || user?.displayName || "User";
  
  return (
    <header className="header">
      <h1>SchoolScope</h1>
      <p>Yelp For Teachers</p>
      {user && (
        <div className="user-info">
          Welcome, {displayName}
        </div>
      )}
    </header>
  );
};

export default Header;
