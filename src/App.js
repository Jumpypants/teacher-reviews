import React, { useState } from "react";
import "./App.css";

// Components
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import TeacherPage from "./components/TeacherPage";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useFirestoreData } from "./hooks/useFirestoreData";

// Utils
import { getAverageRating } from "./utils/ratingUtils";
import { submitTeacher, postReview } from "./utils/firebaseService";

export default function App() {
  const { user, loading, signIn } = useAuth();
  const { teachers, reviews, teacherReviews, fetchTeacherReviews } = useFirestoreData(user);
  
  const [currentView, setCurrentView] = useState("home"); // "home" or "teacher"
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [teacherName, setTeacherName] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [school, setSchool] = useState("");

  // Handlers
  const handleSubmitTeacher = async () => {
    const success = await submitTeacher(teacherName, subjectsInput, school);
    if (success) {
      setTeacherName("");
      setSubjectsInput("");
      setSchool("");
    }
  };

  const handlePostReview = async () => {
    const success = await postReview(user, selectedTeacher, comment, rating);
    if (success) {
      setComment("");
      setRating(5);
    }
  };

  const handleViewTeacher = async (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentView("teacher");
    fetchTeacherReviews(teacher.id);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const getTeacherAverageRating = (teacherId) => {
    return getAverageRating(teacherId, reviews);
  };

  return (
    <div className="App">
      {!user ? (
        <AuthPage onSignIn={signIn} loading={loading} />
      ) : currentView === "home" ? (
        <HomePage
          user={user}
          teachers={teachers}
          reviews={reviews}
          teacherName={teacherName}
          setTeacherName={setTeacherName}
          school={school}
          setSchool={setSchool}
          subjectsInput={subjectsInput}
          setSubjectsInput={setSubjectsInput}
          onSubmitTeacher={handleSubmitTeacher}
          getAverageRating={getTeacherAverageRating}
          onViewTeacher={handleViewTeacher}
        />
      ) : (
        <TeacherPage
          selectedTeacher={selectedTeacher}
          teacherReviews={teacherReviews}
          user={user}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          onPostReview={handlePostReview}
          getAverageRating={getTeacherAverageRating}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
