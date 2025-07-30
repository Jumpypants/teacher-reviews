import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const submitTeacher = async (teacherName, subjectsInput, school) => {
  if (!teacherName || !subjectsInput || !school) return false;

  const subjectsArray = subjectsInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    await addDoc(collection(db, "teachers"), {
      name: teacherName,
      subjects: subjectsArray,
      school: school,
    });
    return true;
  } catch (error) {
    console.error("Error submitting teacher:", error);
    return false;
  }
};

export const postReview = async (user, selectedTeacher, comment, rating) => {
  if (!user || !comment || !selectedTeacher) return false;

  try {
    await addDoc(collection(db, "reviews"), {
      reviewerId: user.uid,
      reviewerName: user.displayName,
      teacherId: selectedTeacher.id,
      comment: comment,
      rating: rating,
      status: "approved", // Auto-approve for now
      timestamp: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error posting review:", error);
    return false;
  }
};
