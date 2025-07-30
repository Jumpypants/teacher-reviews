import React from "react";

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1>TeacherReviews</h1>
      <p>Find and review the best teachers</p>
      {user && (
        <div className="user-info">
          Welcome, {user.displayName}
        </div>
      )}
    </header>
  );
};

export default Header;
