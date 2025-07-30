import React from "react";

const AddTeacherForm = ({
  teacherName,
  setTeacherName,
  school,
  setSchool,
  subjectsInput,
  setSubjectsInput,
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
      <button onClick={onSubmitTeacher} className="btn-primary">
        Add Teacher
      </button>
    </div>
  );
};

export default AddTeacherForm;
