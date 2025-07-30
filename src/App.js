import React, { useState } from "react";
import "./App.css";

// Components
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import AddTeacherPage from "./components/AddTeacherPage";
import TeacherPage from "./components/TeacherPage";
import AdminDashboard from "./components/AdminDashboard";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useFirestoreData } from "./hooks/useFirestoreData";

// Utils
import { getAverageRating } from "./utils/ratingUtils";
import { submitTeacher, postReview } from "./utils/firebaseService";

export default function App() {
  const { user, userRole, loading, signIn } = useAuth();
  const { teachers, reviews, teacherReviews, fetchTeacherReviews } = useFirestoreData(user);
  
  const [currentView, setCurrentView] = useState("home"); // "home", "addTeacher", "teacher", or "admin"
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [teacherName, setTeacherName] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [school, setSchool] = useState("");

  // Handlers
  const handleSubmitTeacher = async () => {
    const success = await submitTeacher(teacherName, subjectsInput, school, userRole);
    if (success) {
      setTeacherName("");
      setSubjectsInput("");
      setSchool("");
      // Navigate back to home after successful submission
      setCurrentView("home");
    }
  };

  const handlePostReview = async () => {
    const success = await postReview(user, selectedTeacher, comment, rating, userRole);
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

  const handleNavigateToAddTeacher = () => {
    setCurrentView("addTeacher");
  };

  const handleNavigateToAdmin = () => {
    setCurrentView("admin");
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
          userRole={userRole}
          teachers={teachers}
          reviews={reviews}
          getAverageRating={getTeacherAverageRating}
          onViewTeacher={handleViewTeacher}
          onNavigateToAddTeacher={handleNavigateToAddTeacher}
          onNavigateToAdmin={handleNavigateToAdmin}
        />
      ) : currentView === "addTeacher" ? (
        <AddTeacherPage
          user={user}
          teacherName={teacherName}
          setTeacherName={setTeacherName}
          school={school}
          setSchool={setSchool}
          subjectsInput={subjectsInput}
          setSubjectsInput={setSubjectsInput}
          onSubmitTeacher={handleSubmitTeacher}
          onBackToHome={handleBackToHome}
        />
      ) : currentView === "admin" ? (
        <AdminDashboard
          user={user}
          onBackToHome={handleBackToHome}
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
