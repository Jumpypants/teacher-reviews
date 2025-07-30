import React, { useEffect, useState } from "react";
import { auth, db, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import {
  doc, setDoc, getDoc, addDoc, collection, onSnapshot
} from "firebase/firestore";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);

    // Check if user exists in Firestore
    const userDoc = doc(db, "users", result.user.uid);
    const docSnap = await getDoc(userDoc);
    if (!docSnap.exists()) {
      await setDoc(userDoc, { role: "user" });
    }
  };

  const postReview = async () => {
    if (!user) return;
    await addDoc(collection(db, "reviews"), {
      reviewerId: user.uid,
      teacherId: "teacher123",
      comment: comment,
      rating: 5,
      status: "pending"
    });
    setComment("");
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write a review..."
          />
          <button onClick={postReview}>Submit</button>

          <ul>
            {reviews.map(r => (
              <li key={r.id}>
                {r.comment} — Status: {r.status}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
}
