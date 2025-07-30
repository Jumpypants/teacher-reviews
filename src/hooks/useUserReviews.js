import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const useUserReviews = (user) => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserReviews([]);
      setLoading(false);
      return;
    }

    // Query all reviews by the current user (including pending ones)
    const userReviewsQuery = query(
      collection(db, "reviews"),
      where("reviewerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userReviewsQuery, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserReviews(reviewsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Get user's existing review for a specific teacher
  const getUserReviewForTeacher = (teacherId) => {
    return userReviews.find(review => review.teacherId === teacherId);
  };

  // Delete a user's existing review
  const deleteUserReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      return false;
    }
  };

  return {
    userReviews,
    loading: loading,
    getUserReviewForTeacher,
    deleteUserReview
  };
};
