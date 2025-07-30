import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      
      if (currentUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const firestoreUserData = docSnap.data();
            setUserRole(firestoreUserData.role || "user");
            setUserData(firestoreUserData);
            console.log("User data:", firestoreUserData);
          } else {
            setUserRole("user");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserRole("user");
          setUserData(null);
        }
      } else {
        setUserRole(null);
        setUserData(null);
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
        // Create new user document
        const newUserData = { 
          role: "user",
          name: result.user.displayName || "Anonymous User",
          email: result.user.email || "",
          photoURL: result.user.photoURL || "",
          createdAt: new Date().toISOString()
        };
        await setDoc(userDoc, newUserData);
        console.log("Created new user document with name:", result.user.displayName);
        
        // Set the user data immediately
        setUserRole("user");
        setUserData(newUserData);
      } else {
        // Check if existing user is missing name or other fields
        const existingData = docSnap.data();
        const needsUpdate = !existingData.name || !existingData.email || !existingData.photoURL;
        
        if (needsUpdate) {
          const updatedUserData = {
            ...existingData,
            name: existingData.name || result.user.displayName || "Anonymous User",
            email: existingData.email || result.user.email || "",
            photoURL: existingData.photoURL || result.user.photoURL || "",
            updatedAt: new Date().toISOString()
          };
          
          await setDoc(userDoc, updatedUserData, { merge: true });
          console.log("Updated existing user document with missing fields");
          
          // Set the updated user data immediately
          setUserRole(updatedUserData.role || "user");
          setUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return { user, userRole, userData, loading, signIn, signOut: handleSignOut };
};
