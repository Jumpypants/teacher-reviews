import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ teacherReviews }) => {
  const approvedReviews = teacherReviews.filter((r) => r.status === "approved");

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {approvedReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        approvedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewsSection;
