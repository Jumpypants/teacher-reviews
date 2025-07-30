import React, { useState } from "react";
import WriteReviewForm from "./WriteReviewForm";
import ReviewsSection from "./ReviewsSection";
import Modal from "./Modal";
import TeacherAvatar from "./TeacherAvatar";
import TeacherEditForm from "./TeacherEditForm";
import { updateTeacher } from "../utils/firebaseService";

const TeacherPage = ({
  selectedTeacher,
  teacherReviews,
  user,
  userRole,
  rating,
  setRating,
  comment,
  setComment,
  isAnonymous,
  setIsAnonymous,
  onPostReview,
  getAverageRating,
  onBackToHome,
  getUserReviewForTeacher
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Get user's existing review for this teacher
  const existingUserReview = user ? getUserReviewForTeacher(selectedTeacher.id) : null;

  const handleOpenReviewModal = () => {
    // If user has existing review, pre-populate the form
    if (existingUserReview) {
      setComment(existingUserReview.comment);
      setRating(existingUserReview.rating);
      setIsAnonymous(existingUserReview.isAnonymous || false);
    }
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    // Reset form when closing without existing review
    if (!existingUserReview) {
      setComment("");
      setRating(5);
      setIsAnonymous(false);
    }
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = async () => {
    const success = await onPostReview();
    if (success) {
      setIsReviewModalOpen(false);
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveTeacher = async (teacherId, name, subjects, school, photoUrl) => {
    const success = await updateTeacher(teacherId, name, subjects, school, photoUrl);
    if (success) {
      setIsEditModalOpen(false);
      // Optionally, you could trigger a refresh of the teacher data here
    }
    return success;
  };

  // Determine button text and state
  const getReviewButtonInfo = () => {
    if (!existingUserReview) {
      return { text: "Write a Review", disabled: false };
    }
    
    switch (existingUserReview.status) {
      case "approved":
        return { text: "Edit Your Review", disabled: false };
      case "pending":
        return { text: "Review Pending Approval", disabled: true };
      case "rejected":
        return { text: "Rewrite Your Review", disabled: false };
      default:
        return { text: "Write a Review", disabled: false };
    }
  };

  const buttonInfo = getReviewButtonInfo();
  return (
    <div>
      <button onClick={onBackToHome} className="back-button">
        ← Back to All Teachers
      </button>

      <div className="teacher-profile">
        <div className="teacher-header">
          <div className="teacher-header-content">
            <TeacherAvatar teacher={selectedTeacher} size="large" />
            <div className="teacher-details">
              <h1>{selectedTeacher.name}</h1>
              <p className="school-name">{selectedTeacher.school}</p>
              <p className="subjects-list">
                Subjects: {selectedTeacher.subjects?.join(", ")}
              </p>
              <div className="rating-summary">
                <span className="large-rating">
                  ★ {getAverageRating(selectedTeacher.id) || "No ratings"}
                </span>
                <span className="review-count">
                  ({teacherReviews.length} reviews)
                </span>
              </div>
              {userRole === "admin" && (
                <div className="admin-edit-section">
                  <button 
                    onClick={handleOpenEditModal}
                    className="btn-admin"
                  >
                    Edit Teacher Info
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {user && (
          <div className="write-review-button-container">
            <button 
              onClick={handleOpenReviewModal} 
              className={`btn-primary write-review-button ${buttonInfo.disabled ? 'disabled' : ''}`}
              disabled={buttonInfo.disabled}
            >
              {buttonInfo.text}
            </button>
            {existingUserReview && existingUserReview.status === "pending" && (
              <p className="review-status-message">
                Your review is waiting for admin approval
              </p>
            )}
          </div>
        )}

        <ReviewsSection teacherReviews={teacherReviews} currentUser={user} />
      </div>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        title={existingUserReview ? "Edit Your Review" : "Write a Review"}
      >
        <WriteReviewForm
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          onPostReview={handleSubmitReview}
          onCancel={handleCloseReviewModal}
          isEditing={!!existingUserReview}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Teacher Information"
      >
        <TeacherEditForm
          teacher={selectedTeacher}
          onSave={handleSaveTeacher}
          onCancel={handleCloseEditModal}
        />
      </Modal>
    </div>
  );
};

export default TeacherPage;
