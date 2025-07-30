import React from "react";
import Header from "./Header";
import AddTeacherForm from "./AddTeacherForm";
import TeachersGrid from "./TeachersGrid";

const HomePage = ({
  user,
  teachers,
  reviews,
  teacherName,
  setTeacherName,
  school,
  setSchool,
  subjectsInput,
  setSubjectsInput,
  onSubmitTeacher,
  getAverageRating,
  onViewTeacher
}) => {
  return (
    <div>
      <Header user={user} />

      {user && (
        <AddTeacherForm
          teacherName={teacherName}
          setTeacherName={setTeacherName}
          school={school}
          setSchool={setSchool}
          subjectsInput={subjectsInput}
          setSubjectsInput={setSubjectsInput}
          onSubmitTeacher={onSubmitTeacher}
        />
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
