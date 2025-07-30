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
  const MAX_CHARACTERS = 1000;
  const MIN_CHARACTERS = 20;
  const [hoveredRating, setHoveredRating] = React.useState(0);
  
  const remainingChars = MAX_CHARACTERS - comment.length;
  const isValidLength = comment.length >= MIN_CHARACTERS && comment.length <= MAX_CHARACTERS;
  const isSubmitDisabled = !isValidLength;
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
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-button ${star <= (hoveredRating || rating) ? 'star-filled' : 'star-empty'}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              title={`${star} star${star !== 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
          <span className="rating-text">({rating} star{rating !== 1 ? 's' : ''})</span>
        </div>
      </div>
      <div className="comment-input">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this teacher..."
          className="review-textarea"
          maxLength={MAX_CHARACTERS}
        />
        <div className="character-info">
          <span className={`character-count ${remainingChars < 50 ? 'warning' : ''}`}>
            {comment.length}/{MAX_CHARACTERS} characters
          </span>
          {comment.length < MIN_CHARACTERS && (
            <span className="validation-message">
              Minimum {MIN_CHARACTERS} characters required
            </span>
          )}
        </div>
      </div>
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
        <button 
          onClick={onPostReview} 
          className={`btn-primary ${isSubmitDisabled ? 'disabled' : ''}`}
          disabled={isSubmitDisabled}
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default WriteReviewForm;
