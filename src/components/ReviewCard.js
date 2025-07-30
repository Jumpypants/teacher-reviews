import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const ReviewCard = ({ review, isCurrentUser = false, userRole, onDeleteReview }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const canDelete = isCurrentUser || userRole === "admin";

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteReview(review.id);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className={`review-card ${isCurrentUser ? 'current-user-review' : ''}`}>
        {isCurrentUser && (
          <div className="your-review-indicator">
            <span className="your-review-badge">Your Review</span>
          </div>
        )}
        <div className="review-header">
          <div className="reviewer-info">
            <span className="reviewer-name">{review.reviewerName || "Anonymous"}</span>
            {review.isAnonymous && (
              <span className="anonymous-indicator" title="Anonymous Review">👤</span>
            )}
          </div>
          <div className="review-header-right">
            <span className="review-rating">★ {review.rating}</span>
            {canDelete && (
              <button 
                onClick={handleDeleteClick}
                className="delete-review-btn"
                title="Delete review"
                aria-label="Delete review"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
        <p className="review-comment">{review.comment}</p>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default ReviewCard;
