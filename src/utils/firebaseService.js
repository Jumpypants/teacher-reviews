import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const submitTeacher = async (teacherName, subjectsInput, school, userRole = "user", photoUrl = "") => {
  if (!teacherName || !subjectsInput || !school) return false;

  // Input sanitization
  const sanitizeInput = (input) => {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const isValidImageUrl = (url) => {
    if (!url) return true; // Empty URL is allowed
    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  // Sanitize inputs
  const cleanName = sanitizeInput(teacherName);
  const cleanSchool = sanitizeInput(school);  
  const cleanPhotoUrl = photoUrl.trim();

  // Validate photo URL
  if (cleanPhotoUrl && !isValidImageUrl(cleanPhotoUrl)) {
    console.error("Invalid image URL format");
    return false;
  }

  const subjectsArray = subjectsInput
    .split(",")
    .map((s) => sanitizeInput(s))
    .filter(Boolean);

  // Determine status based on user role
  const status = userRole === "admin" ? "approved" : "pending";

  try {
    const teacherData = {
      name: cleanName,
      subjects: subjectsArray,
      school: cleanSchool,
      status: status,
      timestamp: new Date(),
    };

    // Only add photoUrl if it's provided and not empty
    if (cleanPhotoUrl) {
      teacherData.photoUrl = cleanPhotoUrl;
    }

    await addDoc(collection(db, "teachers"), teacherData);
    console.log(`Teacher submitted with status: ${status}`);
    return true;
  } catch (error) {
    console.error("Error submitting teacher:", error);
    return false;
  }
};

export const postReview = async (user, selectedTeacher, comment, rating, userRole = "user", existingReviewId = null, isAnonymous = false) => {
  if (!user || !comment || !selectedTeacher) return false;

  // Input sanitization for comment
  const sanitizeInput = (input) => {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const cleanComment = sanitizeInput(comment);
  if (!cleanComment) return false;

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
    const reviewData = {
      reviewerId: user.uid,
      reviewerName: displayName,
      isAnonymous: isAnonymous,
      teacherId: selectedTeacher.id,
      comment: cleanComment,
      rating: rating,
      status: status,
      timestamp: new Date(),
    };
    
    console.log("Posting review with data:", reviewData);
    await addDoc(collection(db, "reviews"), reviewData);
    console.log(`Review ${existingReviewId ? 'replaced' : 'submitted'} with status: ${status} for teacher: ${selectedTeacher.id}`);
    return true;
  } catch (error) {
    console.error("Error posting review:", error);
    return false;
  }
};

export const updateTeacher = async (teacherId, teacherName, subjectsInput, school, photoUrl = "") => {
  if (!teacherId || !teacherName || !subjectsInput || !school) return false;

  // Input sanitization
  const sanitizeInput = (input) => {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const isValidImageUrl = (url) => {
    if (!url) return true; // Empty URL is allowed
    return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  // Sanitize inputs
  const cleanName = sanitizeInput(teacherName);
  const cleanSchool = sanitizeInput(school);
  const cleanPhotoUrl = photoUrl.trim();

  // Validate photo URL
  if (cleanPhotoUrl && !isValidImageUrl(cleanPhotoUrl)) {
    console.error("Invalid image URL format");
    return false;
  }

  const subjectsArray = subjectsInput
    .split(",")
    .map((s) => sanitizeInput(s))
    .filter(Boolean);

  try {
    const teacherData = {
      name: cleanName,
      subjects: subjectsArray,
      school: cleanSchool,
      updatedAt: new Date(),
    };

    // Only add photoUrl if it's provided and not empty
    if (cleanPhotoUrl) {
      teacherData.photoUrl = cleanPhotoUrl;
    } else {
      // If photoUrl is empty, we should remove it from the document
      teacherData.photoUrl = "";
    }

    await updateDoc(doc(db, "teachers", teacherId), teacherData);
    console.log("Teacher updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating teacher:", error);
    // Firebase security rules will reject unauthorized updates
    return false;
  }
};

export const deleteReview = async (reviewId) => {
  if (!reviewId) return false;

  try {
    await deleteDoc(doc(db, "reviews", reviewId));
    console.log("Review deleted successfully:", reviewId);
    return true;
  } catch (error) {
    console.error("Error deleting review:", error);
    return false;
  }
};
