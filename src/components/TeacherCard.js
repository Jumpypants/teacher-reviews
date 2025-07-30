import React from "react";
import TeacherAvatar from "./TeacherAvatar";

const TeacherCard = ({ teacher, avgRating, reviewCount, onViewTeacher }) => {
  return (
    <div className="teacher-card">
      <div className="teacher-card-header">
        <TeacherAvatar teacher={teacher} size="medium" />
        <div className="teacher-info">
          <h3>{teacher.name}</h3>
          <p className="school">{teacher.school}</p>
        </div>
      </div>
      <p className="subjects">{teacher.subjects?.join(", ")}</p>
      <div className="rating-info">
        <span className="rating">★ {avgRating || "No ratings"}</span>
        <span className="review-count">({reviewCount} reviews)</span>
      </div>
      <button onClick={() => onViewTeacher(teacher)} className="btn-secondary">
        View Profile
      </button>
    </div>
  );
};

export default TeacherCard;
