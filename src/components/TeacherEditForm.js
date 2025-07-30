import React, { useState } from "react";

const TeacherEditForm = ({ teacher, onSave, onCancel }) => {
  const [name, setName] = useState(teacher.name);
  const [school, setSchool] = useState(teacher.school);
  const [subjects, setSubjects] = useState(teacher.subjects?.join(", ") || "");
  const [photoUrl, setPhotoUrl] = useState(teacher.photoUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !school.trim() || !subjects.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const success = await onSave(teacher.id, name.trim(), subjects.trim(), school.trim(), photoUrl.trim());
    setIsSubmitting(false);
    
    if (success) {
      onCancel(); // Close the edit form on success
    }
  };

  return (
    <div className="teacher-edit-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teacher-name">Teacher Name *</label>
          <input
            type="text"
            id="teacher-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter teacher's full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="school">School *</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Enter school name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subjects">Subjects *</label>
          <input
            type="text"
            id="subjects"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Enter subjects separated by commas (e.g. Math, Science, History)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo-url">Profile Photo URL</label>
          <input
            type="url"
            id="photo-url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter image URL (optional)"
          />
          <small className="form-help">
            Optional: Provide a URL to the teacher's profile photo
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherEditForm;
