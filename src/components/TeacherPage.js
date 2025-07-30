import React, { useState } from "react";
import WriteReviewForm from "./WriteReviewForm";
import ReviewsSection from "./ReviewsSection";
import Modal from "./Modal";

const TeacherPage = ({
  selectedTeacher,
  teacherReviews,
  user,
  userRole,
  rating,
  setRating,
  comment,
  setComment,
  onPostReview,
  getAverageRating,
  onBackToHome,
  getUserReviewForTeacher
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Get user's existing review for this teacher
  const existingUserReview = user ? getUserReviewForTeacher(selectedTeacher.id) : null;

  const handleOpenReviewModal = () => {
    // If user has existing review, pre-populate the form
    if (existingUserReview) {
      setComment(existingUserReview.comment);
      setRating(existingUserReview.rating);
    }
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    // Reset form when closing without existing review
    if (!existingUserReview) {
      setComment("");
      setRating(5);
    }
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = async () => {
    const success = await onPostReview();
    if (success) {
      setIsReviewModalOpen(false);
    }
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

        <ReviewsSection teacherReviews={teacherReviews} />
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
          onPostReview={handleSubmitReview}
          onCancel={handleCloseReviewModal}
          isEditing={!!existingUserReview}
        />
      </Modal>
    </div>
  );
};

export default TeacherPage;
