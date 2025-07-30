import React from "react";

const ReviewCard = ({ review, isCurrentUser = false }) => {
  return (
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
        <span className="review-rating">★ {review.rating}</span>
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
