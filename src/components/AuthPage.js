import React from "react";

const AuthPage = ({ onSignIn, loading = false }) => {
  if (loading) {
    return (
      <div className="auth-page">
        <h1>SchoolScope</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <h1>SchoolScope</h1>
      <p>Sign in to view and review teachers</p>
      <button onClick={onSignIn} className="btn-primary">
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthPage;
