import React from "react";
import Header from "./Header";
import TeachersGrid from "./TeachersGrid";

const HomePage = ({
  user,
  userRole,
  teachers,
  reviews,
  getAverageRating,
  onViewTeacher,
  onNavigateToAddTeacher,
  onNavigateToAdmin
}) => {
  return (
    <div>
      <Header user={user} />

      {user && (
        <div className="add-teacher-top-button">
          <button onClick={onNavigateToAddTeacher} className="btn-primary">
            + Add New Teacher
          </button>
          {userRole === "admin" && (
            <button 
              onClick={onNavigateToAdmin} 
              className="btn-admin"
              style={{ marginLeft: "10px" }}
            >
              Admin Dashboard
            </button>
          )}
        </div>
      )}

      <TeachersGrid
        teachers={teachers}
        reviews={reviews}
        user={user}
        getAverageRating={getAverageRating}
        onViewTeacher={onViewTeacher}
      />
    </div>
  );
};

export default HomePage;
