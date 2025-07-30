import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ teacherReviews, currentUser }) => {
  // Sort reviews to put user's own review first
  const sortedReviews = React.useMemo(() => {
    if (!currentUser) return teacherReviews;
    
    return [...teacherReviews].sort((a, b) => {
      // User's own review comes first
      if (a.reviewerId === currentUser.uid) return -1;
      if (b.reviewerId === currentUser.uid) return 1;
      // For other reviews, maintain original order (by timestamp if available)
      return 0;
    });
  }, [teacherReviews, currentUser]);

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {sortedReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        sortedReviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            isCurrentUser={currentUser?.uid === review.reviewerId}
          />
        ))
      )}
    </div>
  );
};

export default ReviewsSection;
