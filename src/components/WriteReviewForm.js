import React from "react";

const WriteReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  onPostReview,
  onCancel,
  isEditing = false,
  isAnonymous = false,
  setIsAnonymous
}) => {
  return (
    <div className="write-review-form">
      {isEditing && (
        <div className="edit-notice">
          <p className="edit-notice-text">
            You are editing your existing review. This will replace your previous review.
          </p>
        </div>
      )}
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
      <div className="anonymous-option">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="anonymous-checkbox"
          />
          Post anonymously
        </label>
        <p className="anonymous-hint">
          Your review will be shown as "Anonymous" instead of your name
        </p>
      </div>
      <div className="form-actions">
        <button onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button onClick={onPostReview} className="btn-primary">
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default WriteReviewForm;
