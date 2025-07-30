import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ teacherReviews }) => {
  // Reviews are already filtered for approved status in useFirestoreData
  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {teacherReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        teacherReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewsSection;
