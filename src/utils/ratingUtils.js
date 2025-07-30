export const getAverageRating = (teacherId, reviews) => {
  const teacherReviewsForRating = reviews.filter(
    (r) => r.teacherId === teacherId && r.status === "approved"
  );
  if (teacherReviewsForRating.length === 0) return 0;
  const sum = teacherReviewsForRating.reduce((acc, review) => acc + review.rating, 0);
  return (sum / teacherReviewsForRating.length).toFixed(1);
};
