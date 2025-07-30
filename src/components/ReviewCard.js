import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <span className="reviewer-name">{review.reviewerName || "Anonymous"}</span>
        <span className="review-rating">★ {review.rating}</span>
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
