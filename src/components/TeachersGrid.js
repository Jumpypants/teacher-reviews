import React from "react";
import TeacherCard from "./TeacherCard";

const TeachersGrid = ({ teachers, reviews, user, getAverageRating, onViewTeacher }) => {
  // Teachers are already filtered for approved status in useFirestoreData
  return (
    <div className="teachers-grid">
      <div className="teachers-grid-header">
        <h2>All Teachers</h2>
        <p className="sort-indicator">Sorted by number of reviews</p>
      </div>
      {teachers.length === 0 ? (
        <p>
          No teachers added yet.{" "}
          {user ? "Try adding a teacher using the form above!" : "Sign in to see teachers."}
        </p>
      ) : (
        teachers.map((teacher) => {
          const avgRating = getAverageRating(teacher.id);
          const reviewCount = reviews.filter(
            (r) => r.teacherId === teacher.id
          ).length;

          return (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              avgRating={avgRating}
              reviewCount={reviewCount}
              onViewTeacher={onViewTeacher}
            />
          );
        })
      )}
    </div>
  );
};

export default TeachersGrid;
