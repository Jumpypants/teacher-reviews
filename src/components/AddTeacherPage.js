import React from "react";
import Header from "./Header";
import AddTeacherForm from "./AddTeacherForm";

const AddTeacherPage = ({
  user,
  teacherName,
  setTeacherName,
  school,
  setSchool,
  subjectsInput,
  setSubjectsInput,
  photoUrl,
  setPhotoUrl,
  onSubmitTeacher,
  onBackToHome
}) => {
  return (
    <div>
      <Header user={user} />
      
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <button onClick={onBackToHome} className="back-button">
          ← Back to Home
        </button>
        
        <div style={{ marginTop: "20px" }}>
          <AddTeacherForm
            teacherName={teacherName}
            setTeacherName={setTeacherName}
            school={school}
            setSchool={setSchool}
            subjectsInput={subjectsInput}
            setSubjectsInput={setSubjectsInput}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            onSubmitTeacher={onSubmitTeacher}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTeacherPage;
