import React from "react";

const AddTeacherForm = ({
  teacherName,
  setTeacherName,
  school,
  setSchool,
  subjectsInput,
  setSubjectsInput,
  photoUrl,
  setPhotoUrl,
  onSubmitTeacher
}) => {
  return (
    <div className="add-teacher-section">
      <h2>Add a New Teacher</h2>
      <div className="form-row">
        <input
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="form-input"
        />
        <input
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="form-input"
        />
      </div>
      <input
        placeholder="Subjects (comma-separated)"
        value={subjectsInput}
        onChange={(e) => setSubjectsInput(e.target.value)}
        className="form-input full-width"
      />
      <input
        placeholder="Profile Photo URL (optional)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        className="form-input full-width"
        type="url"
      />
      <p className="photo-hint">
        💡 Tip: You can use a link from Google Drive, LinkedIn, or any public image URL
      </p>
      <button onClick={onSubmitTeacher} className="btn-primary">
        Add Teacher
      </button>
    </div>
  );
};

export default AddTeacherForm;
