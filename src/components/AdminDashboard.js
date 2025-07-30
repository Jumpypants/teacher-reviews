import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const AdminDashboard = ({ user, onBackToHome }) => {
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    // Fetch pending teachers
    const teachersQuery = query(
      collection(db, "teachers"),
      where("status", "==", "pending")
    );

    const teachersUnsubscribe = onSnapshot(teachersQuery, (snapshot) => {
      const teachersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Admin Dashboard - Pending teachers fetched:", teachersData);
      setPendingTeachers(teachersData);
    }, (error) => {
      console.error("Error fetching pending teachers:", error);
    });

    // Fetch pending reviews
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "pending")
    );

    const reviewsUnsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Admin Dashboard - Pending reviews fetched:", reviewsData);
      setPendingReviews(reviewsData);
    }, (error) => {
      console.error("Error fetching pending reviews:", error);
    });

    return () => {
      teachersUnsubscribe();
      reviewsUnsubscribe();
    };
  }, []);

  const approveTeacher = async (teacherId) => {
    try {
      await updateDoc(doc(db, "teachers", teacherId), {
        status: "approved"
      });
      console.log("Teacher approved");
    } catch (error) {
      console.error("Error approving teacher:", error);
    }
  };

  const rejectTeacher = async (teacherId) => {
    try {
      await updateDoc(doc(db, "teachers", teacherId), {
        status: "rejected"
      });
      console.log("Teacher rejected");
    } catch (error) {
      console.error("Error rejecting teacher:", error);
    }
  };

  const approveReview = async (reviewId) => {
    try {
      await updateDoc(doc(db, "reviews", reviewId), {
        status: "approved"
      });
      console.log("Review approved");
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const rejectReview = async (reviewId) => {
    try {
      await updateDoc(doc(db, "reviews", reviewId), {
        status: "rejected"
      });
      console.log("Review rejected");
    } catch (error) {
      console.error("Error rejecting review:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button onClick={onBackToHome} className="back-button">
        ← Back to Home
      </button>
      
      <h1>Admin Dashboard</h1>
      
      <div style={{ marginBottom: "40px" }}>
        <h2>Pending Teachers ({pendingTeachers.length})</h2>
        {pendingTeachers.length === 0 ? (
          <p>No pending teachers to review.</p>
        ) : (
          pendingTeachers.map((teacher) => (
            <div key={teacher.id} className="admin-card">
              <h3>{teacher.name}</h3>
              <p><strong>School:</strong> {teacher.school}</p>
              <p><strong>Subjects:</strong> {teacher.subjects?.join(", ")}</p>
              <p><strong>Submitted:</strong> {teacher.timestamp?.toDate?.()?.toLocaleDateString()}</p>
              <div className="admin-actions">
                <button 
                  onClick={() => approveTeacher(teacher.id)}
                  className="btn-approve"
                >
                  Approve
                </button>
                <button 
                  onClick={() => rejectTeacher(teacher.id)}
                  className="btn-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <h2>Pending Reviews ({pendingReviews.length})</h2>
        {pendingReviews.length === 0 ? (
          <p>No pending reviews to review.</p>
        ) : (
          pendingReviews.map((review) => (
            <div key={review.id} className="admin-card">
              <h4>Review by {review.reviewerName}</h4>
              {review.isAnonymous && (
                <p className="anonymous-badge">
                  <span className="badge">Anonymous Review</span>
                </p>
              )}
              <p><strong>Rating:</strong> {review.rating}/5 stars</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Teacher ID:</strong> {review.teacherId}</p>
              <p><strong>Submitted:</strong> {review.timestamp?.toDate?.()?.toLocaleDateString()}</p>
              <div className="admin-actions">
                <button 
                  onClick={() => approveReview(review.id)}
                  className="btn-approve"
                >
                  Approve
                </button>
                <button 
                  onClick={() => rejectReview(review.id)}
                  className="btn-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
