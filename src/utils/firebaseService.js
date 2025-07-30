import { addDoc, collection } from "firebase/firestore";
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

export const postReview = async (user, selectedTeacher, comment, rating, userRole = "user") => {
  if (!user || !comment || !selectedTeacher) return false;

  // Determine status based on user role
  const status = userRole === "admin" ? "approved" : "pending";

  try {
    await addDoc(collection(db, "reviews"), {
      reviewerId: user.uid,
      reviewerName: user.displayName,
      teacherId: selectedTeacher.id,
      comment: comment,
      rating: rating,
      status: status,
      timestamp: new Date(),
    });
    console.log(`Review submitted with status: ${status}`);
    return true;
  } catch (error) {
    console.error("Error posting review:", error);
    return false;
  }
};
