import React, { useState } from "react";

const TeacherAvatar = ({ teacher, size = "medium", className = "" }) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    small: "teacher-avatar-small",
    medium: "teacher-avatar-medium", 
    large: "teacher-avatar-large"
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const hasValidPhoto = teacher.photoUrl && !imageError;

  return (
    <div className={`teacher-avatar ${sizeClasses[size]} ${className}`}>
      {hasValidPhoto ? (
        <img
          src={teacher.photoUrl}
          alt={`${teacher.name} profile`}
          className="avatar-image"
          onError={handleImageError}
        />
      ) : (
        <div className="avatar-fallback">
          <span className="avatar-initials">
            {getInitials(teacher.name)}
          </span>
        </div>
      )}
    </div>
  );
};

export default TeacherAvatar;
