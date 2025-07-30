import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const submitTeacher = async (teacherName, subjectsInput, school, userRole = "user") => {
  if (!teacherName || !subjectsInput || !school) return false;

  const subjectsArray = subjectsInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Determine status based on user role
  const status = userRole === "admin" ? "approved" : "pending";

  try {
    await addDoc(collection(db, "teachers"), {
      name: teacherName,
      subjects: subjectsArray,
      school: school,
      status: status,
      timestamp: new Date(),
    });
    console.log(`Teacher submitted with status: ${status}`);
    return true;
  } catch (error) {
    console.error("Error submitting teacher:", error);
    return false;
  }
};

export const postReview = async (user, selectedTeacher, comment, rating, userRole = "user", existingReviewId = null, isAnonymous = false) => {
  if (!user || !comment || !selectedTeacher) return false;

  // Determine status based on user role
  const status = userRole === "admin" ? "approved" : "pending";
  
  // Use anonymous name if requested
  const displayName = isAnonymous ? "Anonymous" : user.displayName;

  try {
    // If there's an existing review, delete it first
    if (existingReviewId) {
      await deleteDoc(doc(db, "reviews", existingReviewId));
      console.log("Deleted existing review");
    }

    // Create new review
    await addDoc(collection(db, "reviews"), {
      reviewerId: user.uid,
      reviewerName: displayName,
      isAnonymous: isAnonymous,
      teacherId: selectedTeacher.id,
      comment: comment,
      rating: rating,
      status: status,
      timestamp: new Date(),
    });
    console.log(`Review ${existingReviewId ? 'replaced' : 'submitted'} with status: ${status}`);
    return true;
  } catch (error) {
    console.error("Error posting review:", error);
    return false;
  }
};
