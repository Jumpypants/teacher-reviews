import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user role from Firestore
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserRole(userData.role || "user");
            console.log("User role:", userData.role || "user");
          } else {
            setUserRole("user");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("user");
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  return { user, userRole, loading, signIn };
};
