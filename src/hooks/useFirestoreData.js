import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useFirestoreData = (user) => {
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [teacherReviews, setTeacherReviews] = useState([]);

  useEffect(() => {
    if (!user) {
      console.log("User not authenticated, skipping data fetch");
      return;
    }

    console.log("Fetching data for authenticated user:", user.email);

    // Only fetch approved teachers for better performance and security
    const teachersQuery = query(
      collection(db, "teachers"),
      where("status", "==", "approved")
    );

    const teachersUnsub = onSnapshot(
      teachersQuery,
      (snapshot) => {
        const teachersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Approved teachers data from Firebase:", teachersData);
        setTeachers(teachersData);
      },
      (error) => {
        console.error("Error fetching teachers:", error);
      }
    );

    // Only fetch approved reviews for better performance and security
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "approved")
    );

    const reviewsUnsub = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Approved reviews data from Firebase:", reviewsData);
        setReviews(reviewsData);
      },
      (error) => {
        console.error("Error fetching reviews:", error);
      }
    );

    return () => {
      teachersUnsub();
      reviewsUnsub();
    };
  }, [user]);

  const fetchTeacherReviews = (teacherId) => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("teacherId", "==", teacherId),
      where("status", "==", "approved")
    );

    const unsub = onSnapshot(reviewsQuery, (snapshot) => {
      setTeacherReviews(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return unsub;
  };

  return {
    teachers,
    reviews,
    teacherReviews,
    setTeacherReviews,
    fetchTeacherReviews,
  };
};
