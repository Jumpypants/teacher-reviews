import React, { useEffect, useState } from "react";
import { auth, db, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home"); // "home" or "teacher"
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Data states
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [teacherReviews, setTeacherReviews] = useState([]);

  // Form states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [teacherName, setTeacherName] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [school, setSchool] = useState("");

  // Sign in and create user doc if not exists
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in successful:", result.user);

      const userDoc = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userDoc);
      if (!docSnap.exists()) {
        await setDoc(userDoc, { role: "user" });
        console.log("Created new user document");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // Submit a new review
  const postReview = async () => {
    if (!user || !comment || !selectedTeacher) return;
    await addDoc(collection(db, "reviews"), {
      reviewerId: user.uid,
      reviewerName: user.displayName,
      teacherId: selectedTeacher.id,
      comment: comment,
      rating: rating,
      status: "approved", // Auto-approve for now
      timestamp: new Date()
    });
    setComment("");
    setRating(5);
  };

  // Submit a new teacher
  const submitTeacher = async () => {
    if (!teacherName || !subjectsInput || !school) return;

    const subjectsArray = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    await addDoc(collection(db, "teachers"), {
      name: teacherName,
      subjects: subjectsArray,
      school: school
    });

    setTeacherName("");
    setSubjectsInput("");
    setSchool("");
  };

  // Navigate to teacher page
  const viewTeacher = async (teacher) => {
    setSelectedTeacher(teacher);
    setCurrentView("teacher");
    
    // Fetch reviews for this teacher
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("teacherId", "==", teacher.id)
    );
    
    const unsub = onSnapshot(reviewsQuery, (snapshot) => {
      setTeacherReviews(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    
    return () => unsub();
  };

  // Calculate average rating for a teacher
  const getAverageRating = (teacherId) => {
    const teacherReviewsForRating = reviews.filter(r => r.teacherId === teacherId && r.status === "approved");
    if (teacherReviewsForRating.length === 0) return 0;
    const sum = teacherReviewsForRating.reduce((acc, review) => acc + review.rating, 0);
    return (sum / teacherReviewsForRating.length).toFixed(1);
  };

  // Fetch teachers and reviews on load
  useEffect(() => {
    // Only fetch data if user is authenticated
    if (!user) {
      console.log("User not authenticated, skipping data fetch");
      return;
    }
    
    console.log("Fetching data for authenticated user:", user.email);
    
    const teachersUnsub = onSnapshot(
      collection(db, "teachers"), 
      (snapshot) => {
        const teachersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Teachers data from Firebase:", teachersData);
        setTeachers(teachersData);
      },
      (error) => {
        console.error("Error fetching teachers:", error);
      }
    );

    const reviewsUnsub = onSnapshot(
      collection(db, "reviews"), 
      (snapshot) => {
        const reviewsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Reviews data from Firebase:", reviewsData);
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
  }, [user]); // Added user as dependency

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Home Page Component
  const HomePage = () => (
    <div>
      <header className="header">
        <h1>TeacherReviews</h1>
        <p>Find and review the best teachers</p>
        {user && (
          <div className="user-info">
            Welcome, {user.displayName}
          </div>
        )}
      </header>

      {user && (
        <div className="add-teacher-section">
          <h2>Add a New Teacher</h2>
          <div className="form-row">
            <input
              placeholder="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="form-input"
            />
            <input
              placeholder="School"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="form-input"
            />
          </div>
          <input
            placeholder="Subjects (comma-separated)"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            className="form-input full-width"
          />
          <button onClick={submitTeacher} className="btn-primary">Add Teacher</button>
        </div>
      )}

      <div className="teachers-grid">
        <h2>All Teachers</h2>
        {console.log("Current teachers state:", teachers)}
        {teachers.length === 0 ? (
          <p>No teachers added yet. {user ? "Try adding a teacher using the form above!" : "Sign in to see teachers."}</p>
        ) : (
          teachers.map((teacher) => {
            const avgRating = getAverageRating(teacher.id);
            const reviewCount = reviews.filter(r => r.teacherId === teacher.id && r.status === "approved").length;
            
            return (
              <div key={teacher.id} className="teacher-card">
                <div className="teacher-info">
                  <h3>{teacher.name}</h3>
                  <p className="school">{teacher.school}</p>
                  <p className="subjects">{teacher.subjects?.join(", ")}</p>
                  <div className="rating-info">
                    <span className="rating">★ {avgRating || "No ratings"}</span>
                    <span className="review-count">({reviewCount} reviews)</span>
                  </div>
                </div>
                <button 
                  onClick={() => viewTeacher(teacher)}
                  className="btn-secondary"
                >
                  View Profile
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  // Teacher Page Component
  const TeacherPage = () => (
    <div>
      <button 
        onClick={() => setCurrentView("home")} 
        className="back-button"
      >
        ← Back to All Teachers
      </button>
      
      <div className="teacher-profile">
        <div className="teacher-header">
          <h1>{selectedTeacher.name}</h1>
          <p className="school-name">{selectedTeacher.school}</p>
          <p className="subjects-list">Subjects: {selectedTeacher.subjects?.join(", ")}</p>
          
          <div className="rating-summary">
            <span className="large-rating">★ {getAverageRating(selectedTeacher.id) || "No ratings"}</span>
            <span className="review-count">({teacherReviews.filter(r => r.status === "approved").length} reviews)</span>
          </div>
        </div>

        {user && (
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
            <button onClick={postReview} className="btn-primary">Submit Review</button>
          </div>
        )}

        <div className="reviews-section">
          <h3>Reviews</h3>
          {teacherReviews.filter(r => r.status === "approved").length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            teacherReviews
              .filter(r => r.status === "approved")
              .map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">{review.reviewerName || "Anonymous"}</span>
                    <span className="review-rating">★ {review.rating}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {loading ? (
        <div className="auth-page">
          <h1>TeacherReviews</h1>
          <p>Loading...</p>
        </div>
      ) : !user ? (
        <div className="auth-page">
          <h1>TeacherReviews</h1>
          <p>Sign in to view and review teachers</p>
          <button onClick={signIn} className="btn-primary">Sign in with Google</button>
        </div>
      ) : (
        currentView === "home" ? <HomePage /> : <TeacherPage />
      )}
    </div>
  );
}
