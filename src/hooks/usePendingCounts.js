import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const usePendingCounts = (userRole) => {
  const [pendingTeachersCount, setPendingTeachersCount] = useState(0);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    // Only fetch if user is admin
    if (userRole !== "admin") {
      setPendingTeachersCount(0);
      setPendingReviewsCount(0);
      setTotalPending(0);
      return;
    }

    // Fetch pending teachers count
    const teachersQuery = query(
      collection(db, "teachers"),
      where("status", "==", "pending")
    );

    const teachersUnsubscribe = onSnapshot(teachersQuery, (snapshot) => {
      const count = snapshot.docs.length;
      setPendingTeachersCount(count);
    }, (error) => {
      console.error("Error fetching pending teachers count:", error);
      setPendingTeachersCount(0);
    });

    // Fetch pending reviews count
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "pending")
    );

    const reviewsUnsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
      const count = snapshot.docs.length;
      setPendingReviewsCount(count);
    }, (error) => {
      console.error("Error fetching pending reviews count:", error);
      setPendingReviewsCount(0);
    });

    return () => {
      teachersUnsubscribe();
      reviewsUnsubscribe();
    };
  }, [userRole]);

  // Update total whenever individual counts change
  useEffect(() => {
    setTotalPending(pendingTeachersCount + pendingReviewsCount);
  }, [pendingTeachersCount, pendingReviewsCount]);

  return {
    pendingTeachersCount,
    pendingReviewsCount,
    totalPending
  };
};
