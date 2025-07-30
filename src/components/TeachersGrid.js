import React from "react";
import TeacherCard from "./TeacherCard";

const TeachersGrid = ({ teachers, reviews, user, getAverageRating, onViewTeacher }) => {
  return (
    <div className="teachers-grid">
      <h2>All Teachers</h2>
      {teachers.length === 0 ? (
        <p>
          No teachers added yet.{" "}
          {user ? "Try adding a teacher using the form above!" : "Sign in to see teachers."}
        </p>
      ) : (
        teachers.map((teacher) => {
          const avgRating = getAverageRating(teacher.id);
          const reviewCount = reviews.filter(
            (r) => r.teacherId === teacher.id && r.status === "approved"
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
