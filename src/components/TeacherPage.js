import React from "react";
import WriteReviewForm from "./WriteReviewForm";
import ReviewsSection from "./ReviewsSection";

const TeacherPage = ({
  selectedTeacher,
  teacherReviews,
  user,
  rating,
  setRating,
  comment,
  setComment,
  onPostReview,
  getAverageRating,
  onBackToHome
}) => {
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
              ({teacherReviews.filter((r) => r.status === "approved").length} reviews)
            </span>
          </div>
        </div>

        {user && (
          <WriteReviewForm
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            onPostReview={onPostReview}
          />
        )}

        <ReviewsSection teacherReviews={teacherReviews} />
      </div>
    </div>
  );
};

export default TeacherPage;
