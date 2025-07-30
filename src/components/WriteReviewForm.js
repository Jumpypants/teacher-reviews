import React from "react";

const WriteReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  onPostReview
}) => {
  return (
    <div className="write-review-section">
      <h3>Write a Review</h3>
      <div className="rating-input">
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this teacher..."
        className="review-textarea"
      />
      <button onClick={onPostReview} className="btn-primary">
        Submit Review
      </button>
    </div>
  );
};

export default WriteReviewForm;
