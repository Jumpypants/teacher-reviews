import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useFirestoreData = (user) => {
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [teacherReviews, setTeacherReviews] = useState([]);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

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

  // Separate effect for teacher reviews listener
  useEffect(() => {
    if (!user || !currentTeacherId) {
      setTeacherReviews([]);
      return;
    }

    console.log("Setting up teacher reviews listener for:", currentTeacherId);

    // Fetch both approved and pending reviews for teacher pages
    // Only exclude rejected reviews
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("teacherId", "==", currentTeacherId),
      where("status", "in", ["approved", "pending"])
    );

    const unsub = onSnapshot(reviewsQuery, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      console.log(`Teacher reviews updated for ${currentTeacherId}:`, reviewsData.length, "reviews");
      setTeacherReviews(reviewsData);
    }, (error) => {
      console.error("Error fetching teacher reviews:", error);
    });

    return () => {
      console.log("Cleaning up teacher reviews listener for:", currentTeacherId);
      unsub();
    };
  }, [user, currentTeacherId]);

  const fetchTeacherReviews = (teacherId) => {
    console.log("Fetching reviews for teacher:", teacherId);
    setCurrentTeacherId(teacherId);
  };

  const refreshTeacherReviews = () => {
    if (currentTeacherId) {
      console.log("Manually refreshing teacher reviews for:", currentTeacherId);
      // Force refresh by re-setting the currentTeacherId which will trigger the useEffect
      const teacherId = currentTeacherId;
      setCurrentTeacherId(null);
      // Use setTimeout to ensure the effect cleans up before setting the new value
      setTimeout(() => setCurrentTeacherId(teacherId), 50);
    }
  };

  return {
    teachers,
    reviews,
    teacherReviews,
    setTeacherReviews,
    fetchTeacherReviews,
    refreshTeacherReviews,
  };
};
