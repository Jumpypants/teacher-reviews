import React from "react";

const TeacherCard = ({ teacher, avgRating, reviewCount, onViewTeacher }) => {
  return (
    <div className="teacher-card">
      <div className="teacher-info">
        <h3>{teacher.name}</h3>
        <p className="school">{teacher.school}</p>
        <p className="subjects">{teacher.subjects?.join(", ")}</p>
        <div className="rating-info">
          <span className="rating">★ {avgRating || "No ratings"}</span>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>
      </div>
      <button onClick={() => onViewTeacher(teacher)} className="btn-secondary">
        View Profile
      </button>
    </div>
  );
};

export default TeacherCard;
