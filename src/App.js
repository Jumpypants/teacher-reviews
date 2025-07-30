import React, { useState } from "react";
import "./styles/index.css";

// Components
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import AddTeacherPage from "./components/AddTeacherPage";
import TeacherPage from "./components/TeacherPage";
import AdminDashboard from "./components/AdminDashboard";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useFirestoreData } from "./hooks/useFirestoreData";
import { useUserReviews } from "./hooks/useUserReviews";

// Utils
import { getAverageRating } from "./utils/ratingUtils";
import { submitTeacher, postReview } from "./utils/firebaseService";

export default function App() {
  const { user, userRole, userData, loading, signIn, signOut } = useAuth();
  const { teachers, reviews, teacherReviews, fetchTeacherReviews, refreshTeacherReviews } = useFirestoreData(user);
  const { getUserReviewForTeacher } = useUserReviews(user);
  
  const [currentView, setCurrentView] = useState("home"); // "home", "addTeacher", "teacher", or "admin"
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [school, setSchool] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Handlers
  const handleSubmitTeacher = async () => {
    const success = await submitTeacher(teacherName, subjectsInput, school, userRole, photoUrl);
    if (success) {
      setTeacherName("");
      setSubjectsInput("");
      setSchool("");
      setPhotoUrl("");
      // Navigate back to home after successful submission
      setCurrentView("home");
    }
  };

  const handlePostReview = async () => {
    console.log("Posting review for teacher:", selectedTeacher?.id, selectedTeacher?.name);
    
    // Check if user already has a review for this teacher
    const existingReview = getUserReviewForTeacher(selectedTeacher.id);
    const existingReviewId = existingReview ? existingReview.id : null;
    
    const success = await postReview(user, selectedTeacher, comment, rating, userRole, existingReviewId, isAnonymous);
    if (success) {
      console.log("Review posted successfully, refreshing review list");
      setComment("");
      setRating(5);
      setIsAnonymous(false);
      // Manually refresh the teacher reviews to ensure immediate update
      setTimeout(() => refreshTeacherReviews(), 200);
    }
    return success;
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
    setSelectedTeacher(null);
    // The teacherReviews will be automatically cleared by the useFirestoreData hook
    // when currentTeacherId becomes null
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
          userData={userData}
          teachers={teachers}
          reviews={reviews}
          getAverageRating={getTeacherAverageRating}
          onViewTeacher={handleViewTeacher}
          onNavigateToAddTeacher={handleNavigateToAddTeacher}
          onNavigateToAdmin={handleNavigateToAdmin}
          onSignOut={signOut}
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
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
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
          userRole={userRole}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          onPostReview={handlePostReview}
          getAverageRating={getTeacherAverageRating}
          onBackToHome={handleBackToHome}
          getUserReviewForTeacher={getUserReviewForTeacher}
          refreshTeacherReviews={refreshTeacherReviews}
        />
      )}
    </div>
  );
}
